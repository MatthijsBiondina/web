# app/exceptions/auth_exceptions.py
from fastapi import HTTPException

from app.models.domain.roles import Role


class AuthException(HTTPException):
    def __init__(self, code: str, message: str, status_code: int = 403):
        self.code = code
        super().__init__(
            status_code=status_code, detail={"code": self.code, "message": message}
        )


class NotAuthenticatedException(AuthException):
    def __init__(self):
        super().__init__(
            code="NOT_AUTHENTICATED",
            message="User is not authenticated",
            status_code=401,
        )


class RoleRequiredException(AuthException):
    def __init__(self, role: Role):
        super().__init__(
            code="INSUFFICIENT_ROLE",
            message=f"Role {str(role)} required",
            status_code=403,
        )


class TermsNotAcceptedException(AuthException):
    def __init__(self):
        super().__init__(
            code="TERMS_NOT_ACCEPTED",
            message="User has not accepted terms",
            status_code=403,
        )


class EmailNotVerifiedException(AuthException):
    def __init__(self):
        super().__init__(
            code="EMAIL_NOT_VERIFIED",
            message="User email is not verified",
            status_code=403,
        )


class UserNotFoundException(AuthException):
    def __init__(self):
        super().__init__(
            code="USER_NOT_FOUND",
            message="User not found",
            status_code=404,
        )
