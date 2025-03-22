# app/models/domain/roles.py
from enum import Enum


class Role(Enum):
    ADMIN = "admin"

    UNVERIFIED_USER = "unverified_user"
    VERIFIED_USER = "verified_user"

    def __str__(self):
        return self.value
