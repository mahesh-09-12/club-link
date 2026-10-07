from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    UserResponse,
    TokenResponse
)
from app.auth.security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):
    """Registers a new user (student, club_coordinator, or faculty_coordinator)."""
    # Check for existing email
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address already exists"
        )

    # Hash the password
    hashed_pwd = hash_password(request.password)

    # Create new user record
    user = User(
        full_name=request.full_name,
        email=request.email,
        password_hash=hashed_pwd,
        role=request.role.value if hasattr(request.role, "value") else str(request.role)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@router.post("/login", response_model=TokenResponse)
def login_user(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    """Authenticates user credentials and returns a JWT access token."""
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # Issue JWT token containing user id and role
    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "role": user.role,
            "email": user.email
        }
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Returns the current authenticated user's profile info."""
    return current_user
