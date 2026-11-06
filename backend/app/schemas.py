from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    bio: Optional[str] = None
    referral_code: Optional[str] = None
    points: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access: str
    user: UserOut

class LoginRequest(BaseModel):
    username: str
    password: str

class ProjectBase(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: int
    created_at: datetime
    maker_id: int
    maker: UserOut
    class Config:
        from_attributes = True

class WorkshopBase(BaseModel):
    title: str
    description: str
    price: float
    scheduled_at: datetime
    meeting_link: str

class WorkshopCreate(WorkshopBase):
    pass

class WorkshopOut(WorkshopBase):
    id: int
    host_id: int
    host: UserOut
    class Config:
        from_attributes = True

class WorkspaceBase(BaseModel):
    name: str
    shared_notes: str

class WorkspaceCreate(BaseModel):
    name: str

class WorkspaceOut(WorkspaceBase):
    id: int
    owner_id: int
    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    project_count: int
    workshop_count: int
    points: int