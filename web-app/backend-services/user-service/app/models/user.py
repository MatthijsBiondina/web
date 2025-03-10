from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class UserBase(BaseModel):
    uid: str
    email: EmailStr
    displayName: Optional[str] = None
    photoURL: Optional[str] = None
    hasAcceptedTerms: bool = False

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    displayName: Optional[str] = None
    photoURL: Optional[str] = None
    hasAcceptedTerms: Optional[bool] = None

class UserInDB(UserBase):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True

class UserResponse(UserBase):
    _id: Optional[str] = None  # MongoDB ID
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True