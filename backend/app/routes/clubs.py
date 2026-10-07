from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User, UserRole
from app.models.club import Club, ClubStatus
from app.schemas.club import ClubCreate, ClubUpdate, ClubResponse
from app.auth.security import get_current_user, require_role

router = APIRouter(prefix="/api/clubs", tags=["Clubs"])


@router.get("", response_model=list[ClubResponse])
def list_clubs(
    category: str | None = Query(default=None, description="Filter clubs by category"),
    db: Session = Depends(get_db)
):
    """Retrieves a list of all campus clubs, optionally filtered by category."""
    query = db.query(Club)
    if category:
        query = query.filter(Club.category.ilike(f"%{category}%"))
    return query.all()


@router.get("/{club_id}", response_model=ClubResponse)
def get_club(
    club_id: int,
    db: Session = Depends(get_db)
):
    """Retrieves detailed information for a single club by its ID."""
    club = db.query(Club).filter(Club.id == club_id).first()
    if not club:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Club with ID {club_id} not found"
        )
    return club


@router.post("", response_model=ClubResponse, status_code=status.HTTP_201_CREATED)
def create_club(
    request: ClubCreate,
    current_user: User = Depends(require_role(UserRole.FACULTY_COORDINATOR.value)),
    db: Session = Depends(get_db)
):
    """Creates a new club. Only faculty coordinators can create clubs."""
    # Check for duplicate club name
    existing_club = db.query(Club).filter(Club.name.ilike(request.name)).first()
    if existing_club:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"A club named '{request.name}' already exists"
        )

    # Status value normalization
    status_val = request.status.value if hasattr(request.status, "value") else str(request.status)

    new_club = Club(
        name=request.name,
        description=request.description,
        category=request.category,
        faculty_coordinator_id=current_user.id,
        club_coordinator_id=request.club_coordinator_id,
        status=status_val
    )

    db.add(new_club)
    db.commit()
    db.refresh(new_club)

    return new_club


@router.put("/{club_id}", response_model=ClubResponse)
def update_club(
    club_id: int,
    request: ClubUpdate,
    current_user: User = Depends(require_role(UserRole.FACULTY_COORDINATOR.value)),
    db: Session = Depends(get_db)
):
    """Updates an existing club. Allowed only for the assigned faculty coordinator."""
    club = db.query(Club).filter(Club.id == club_id).first()
    if not club:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Club with ID {club_id} not found"
        )

    # Authorization check: only assigned faculty coordinator can update
    if club.faculty_coordinator_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to update this club. Only the assigned faculty coordinator can perform updates."
        )

    # Check for duplicate club name if name is changing
    if request.name and request.name.lower() != club.name.lower():
        existing_club = db.query(Club).filter(Club.name.ilike(request.name)).first()
        if existing_club:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"A club named '{request.name}' already exists"
            )
        club.name = request.name

    if request.description is not None:
        club.description = request.description
    if request.category is not None:
        club.category = request.category
    if request.club_coordinator_id is not None:
        club.club_coordinator_id = request.club_coordinator_id
    if request.status is not None:
        status_val = request.status.value if hasattr(request.status, "value") else str(request.status)
        club.status = status_val

    db.commit()
    db.refresh(club)

    return club


@router.delete("/{club_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_club(
    club_id: int,
    current_user: User = Depends(require_role(UserRole.FACULTY_COORDINATOR.value)),
    db: Session = Depends(get_db)
):
    """Deletes a club. Allowed only for the assigned faculty coordinator."""
    club = db.query(Club).filter(Club.id == club_id).first()
    if not club:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Club with ID {club_id} not found"
        )

    # Authorization check: only assigned faculty coordinator can delete
    if club.faculty_coordinator_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to delete this club. Only the assigned faculty coordinator can perform deletion."
        )

    db.delete(club)
    db.commit()
    return None
