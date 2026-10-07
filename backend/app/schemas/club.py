from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.models.club import ClubStatus


class ClubCreate(BaseModel):
    name: str
    description: str | None = None
    category: str
    club_coordinator_id: int | None = None
    status: ClubStatus = ClubStatus.ACTIVE


class ClubUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    category: str | None = None
    club_coordinator_id: int | None = None
    status: ClubStatus | None = None


class ClubResponse(BaseModel):
    id: int
    name: str
    description: str | None
    category: str
    faculty_coordinator_id: int | None
    club_coordinator_id: int | None
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
