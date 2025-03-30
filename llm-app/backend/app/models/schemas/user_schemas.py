# app/models/schemas/user_schema.py
from datetime import datetime

from app.models.schemas.defaults import SchemaBase


class ProfileCreate(SchemaBase):
    has_accepted_terms: bool | None = None
    display_name: str | None = None


class ProfileUpdate(SchemaBase):
    has_accepted_terms: bool | None = None
    display_name: str | None = None
    photo_url: str | None = None


class UserResponse(SchemaBase):
    uid: str
    email: str
    has_accepted_terms: bool
    display_name: str
    photo_url: str
    created_at: datetime
