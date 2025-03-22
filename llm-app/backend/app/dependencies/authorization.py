# app/dependencies/auth.py
from typing import List
from fastapi import Request, HTTPException

from app.exceptions.auth_exceptions import (
    EmailNotVerifiedException,
    NotAuthenticatedException,
    RoleRequiredException,
    TermsNotAcceptedException,
    UserNotFoundException,
)
from app.models.domain.roles import Role
from app.services.user_service import UserService


def authorize(role: Role):
    def authorization_checker(request: Request):
        user_data = request.state.user
        if not user_data:
            raise NotAuthenticatedException()

        user = UserService.get_or_create_user(user_data)
        if not user:
            raise UserNotFoundException()

        if role == Role.UNVERIFIED_USER:
            return user
        else:
            user_roles = user.roles
            if str(role) not in user_roles:
                raise RoleRequiredException(role)
            if not user.has_accepted_terms:
                raise TermsNotAcceptedException()
            if not user_data.get("email_verified"):
                raise EmailNotVerifiedException()

            return user

    return authorization_checker


# Current user dependency (for convenience)
def get_current_user(request: Request):
    user_data = request.state.user
    if not user_data:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Get or create user in database
    db_user = UserService.get_or_create_user(user_data)
    return db_user
