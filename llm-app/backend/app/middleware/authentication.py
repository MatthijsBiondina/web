# app/middleware/auth.py
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from firebase_admin import auth
from firebase_admin.exceptions import FirebaseError
import logging

logger = logging.getLogger(__name__)


class AuthenticationMiddleware(BaseHTTPMiddleware):
    EXEMPTED_PATHS = ["/health", "/docs", "/openapi.json", "/api/webhooks/mollie"]

    async def dispatch(self, request: Request, call_next):

        # Skip auth for exempted paths
        if request.url.path in self.EXEMPTED_PATHS:
            return await call_next(request)
        if request.method == "OPTIONS":
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid authentication")

        # Validate token
        token = auth_header.replace("Bearer ", "")
        try:
            # Verify with Firebase
            decoded_token = auth.verify_id_token(token)
            user_id = decoded_token["uid"]

            # Add user details to request state
            request.state.user = decoded_token
            request.state.user_id = user_id

            return await call_next(request)
        except (
            auth.InvalidIdTokenError,
            auth.ExpiredIdTokenError,
            auth.RevokedIdTokenError,
            auth.CertificateFetchError,
            auth.UserDisabledError,
            FirebaseError,
        ) as e:
            # These are authentication-specific errors
            logger.warning(f"Authentication error: {str(e)}")
            raise HTTPException(
                status_code=401, detail=f"Invalid authentication: {str(e)}"
            )
