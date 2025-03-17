from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    displayName: Optional[str] = None
    photoUrl: Optional[str] = None


class UserUpdate(BaseModel):
    displayName: Optional[str] = None
    photoURL: Optional[str] = None
    hasAcceptedTerms: Optional[bool] = None


class UserResponse(UserBase):
    uid: str
    hasAcceptedTerms: bool = False

    class Config:
        orm_mode = True
