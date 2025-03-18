# app/models/user.py
from pydantic import BaseModel
from typing import Optional

# Request Models
class UserCreate(BaseModel):
    has_accepted_terms: bool = False

class UserUpdate(BaseModel):
    display_name: Optional[str] = None
    photo_url: Optional[str] = None
    has_accepted_terms: Optional[bool] = None