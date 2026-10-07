from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
import enum
from app.database import Base


class UserRole(str, enum.Enum):
    STUDENT = "student"
    CLUB_COORDINATOR = "club_coordinator"
    FACULTY_COORDINATOR = "faculty_coordinator"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default=UserRole.STUDENT.value)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
