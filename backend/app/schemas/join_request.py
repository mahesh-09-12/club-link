from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.models.join_request import JoinRequestStatus


class JoinRequestCreate(BaseModel):
    club_id: int


class JoinRequestUpdate(BaseModel):
    status: JoinRequestStatus


class JoinRequestResponse(BaseModel):
    id: int
    student_id: int
    club_id: int
    status: JoinRequestStatus
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
