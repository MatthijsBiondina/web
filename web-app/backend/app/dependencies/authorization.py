# app/dependencies/auth.py
from typing import List
from fastapi import Request, HTTPException

from app.models.domain.roles import Role

def authorize(role: Role | None):
    def role_checker(request: Request):
        user = request.state.user
        user_roles = user.get("roles", [])
        if role not in user_roles:
            raise HTTPException(
                status_code=403, 
                detail=f"Role '{role}' required"
            )
        return user
    return role_checker

# Current user dependency (for convenience)
def get_current_user(request: Request):
    return request.state.user