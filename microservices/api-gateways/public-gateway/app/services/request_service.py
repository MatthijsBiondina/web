import logging
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import httpx
from app.config import settings

logger = logging.getLogger("public-gateway")
security = HTTPBearer()


class RequestService:
    def __init__(self, base_url: str, credentials: HTTPAuthorizationCredentials = None):
        self.base_url = base_url
        self.credentials = credentials

    async def get(self, endpoint):
        authentication_response = await self._authenticate()

        logger.info("get")

    async def _authenticate(self):
        if not self.credentials:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication credentials missing",
            )

        token = self.credentials.credentials

        logger.info(token)
        url = f"{settings.AUTHENTICATION_SERVICE_URL}/validate-token"
        logger.info(url)

        async with httpx.AsyncClient() as client:
            headers = {"Authorization": f"Bearer {token}"}

            try:
                response = await client.get(
                    f"{settings.AUTHENTICATION_SERVICE_URL}/validate-token"
                )
            except Exception as e:
                logger.error(str(e))

            return response
