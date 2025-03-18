# app/models/domain/roles.py
from enum import Enum


class Role(Enum):
    ADMIN = "admin"
    FUNDER = "funder"
    MERCHANT = "merchant"
    CONSUMER = "consumer"
    PUBLIC = "public"

    def __str__(self):
        return self.value
