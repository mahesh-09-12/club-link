from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth.security import get_current_user, require_role
from app.models.user import User, UserRole
from app.models.club import Club
from app.models.join_request import JoinRequest, JoinRequestStatus
from app.schemas.join_request import (
    JoinRequestCreate,
    JoinRequestUpdate,
    JoinRequestResponse,
)

router = APIRouter(prefix="/api", tags=["Join Requests"])


@router.post(
    "/join-requests",
    response_model=JoinRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_join_request(
    request_data: JoinRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.STUDENT.value)),
):
    """
    Create a new join request for a club. Only accessible to students.
    """
    # Verify that the target club exists
    club = db.query(Club).filter(Club.id == request_data.club_id).first()
    if not club:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Club not found",
        )

    # Check for an existing pending join request by this student for this club
    existing_request = (
        db.query(JoinRequest)
        .filter(
            JoinRequest.student_id == current_user.id,
            JoinRequest.club_id == request_data.club_id,
            JoinRequest.status == JoinRequestStatus.PENDING.value,
        )
        .first()
    )
    if existing_request:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A pending join request for this club already exists",
        )

    # Create new join request
    new_request = JoinRequest(
        student_id=current_user.id,
        club_id=request_data.club_id,
        status=JoinRequestStatus.PENDING.value,
    )
    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    return new_request


@router.get(
    "/join-requests/my",
    response_model=List[JoinRequestResponse],
    status_code=status.HTTP_200_OK,
)
def get_my_join_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.STUDENT.value)),
):
    """
    Retrieve all join requests submitted by the current authenticated student.
    """
    return (
        db.query(JoinRequest)
        .filter(JoinRequest.student_id == current_user.id)
        .all()
    )


@router.get(
    "/clubs/{club_id}/join-requests",
    response_model=List[JoinRequestResponse],
    status_code=status.HTTP_200_OK,
)
def get_club_join_requests(
    club_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Retrieve all join requests for a specific club.
    Only accessible by the assigned faculty coordinator or club coordinator.
    """
    club = db.query(Club).filter(Club.id == club_id).first()
    if not club:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Club not found",
        )

    # Authorization check: must be assigned faculty or club coordinator
    is_assigned_faculty = club.faculty_coordinator_id == current_user.id
    is_assigned_club_coord = club.club_coordinator_id == current_user.id

    if not (is_assigned_faculty or is_assigned_club_coord):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view join requests for this club",
        )

    return (
        db.query(JoinRequest)
        .filter(JoinRequest.club_id == club_id)
        .all()
    )


@router.put(
    "/join-requests/{request_id}",
    response_model=JoinRequestResponse,
    status_code=status.HTTP_200_OK,
)
def update_join_request(
    request_id: int,
    update_data: JoinRequestUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Update the status of a join request (approve or reject).
    Only accessible by the assigned faculty coordinator or club coordinator.
    """
    join_request = db.query(JoinRequest).filter(JoinRequest.id == request_id).first()
    if not join_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Join request not found",
        )

    club = db.query(Club).filter(Club.id == join_request.club_id).first()
    if not club:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Associated club not found",
        )

    # Authorization check: must be assigned faculty or club coordinator
    is_assigned_faculty = club.faculty_coordinator_id == current_user.id
    is_assigned_club_coord = club.club_coordinator_id == current_user.id

    if not (is_assigned_faculty or is_assigned_club_coord):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update join requests for this club",
        )

    # Validate target status
    target_status = update_data.status
    if target_status not in [JoinRequestStatus.APPROVED, JoinRequestStatus.REJECTED]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Join request status can only be updated to 'approved' or 'rejected'",
        )

    # Cannot revert an already processed (approved or rejected) request back to pending or alter it
    if join_request.status in [JoinRequestStatus.APPROVED.value, JoinRequestStatus.REJECTED.value]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update an already approved or rejected join request",
        )

    join_request.status = target_status.value
    db.commit()
    db.refresh(join_request)

    return join_request
