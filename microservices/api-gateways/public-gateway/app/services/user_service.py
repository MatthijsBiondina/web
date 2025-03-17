import logging
from typing import Any, Dict
import httpx
from fastapi import HTTPException, status

from app.config import settings

logger = logging.getLogger("public-gateway")


class UserServiceClient:
    """
    Client for communicating with the user service
    """

    def __init__(self):
        self.base_url = settings.USER_SERVICE_URL
        self.timeout = 10.0

    async def call_service(
        self, method: str, endpoint: str, data: Dict[str, Any] | None = None
    ):
        """
        Generic method to call the user service
        """

    async def create_user(self, user_data: dict):
        """
        Create or update a user with the user service
        """
        response = await self._make_request("post", "users/", headers=user_data)
        return response

    async def get_profile(self, uid: str):
        """
        Get a user's profile from the user service"""
        profile = await self._make_request(
            "get",
            "users/profile",
            headers={"X-User-ID": uid},
        )
        return profile

    async def update_profile(self, uid: str, update_data: dict):
        """
        Update a user's profile
        """
        async with httpx.AsyncClient() as client:
            try:
                response = await client.put(
                    f"{self.base_url}/users/profile",
                    headers={
                        "X-User-ID": uid
                    },  # Pass UID in header for backend to identify user
                    json=update_data,
                    timeout=self.timeout,
                )

                if response.status_code == 200:
                    return response.json()
                elif response.status_code == 404:
                    # User not found
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="User not found",
                    )
                else:
                    # Log unexpected response
                    print(
                        f"Unexpected response from user service: {response.status_code}"
                    )
                    response.raise_for_status()

            except httpx.RequestError as e:
                # Log connection error
                print(f"Error connecting to user service: {str(e)}")
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail="User service unavailable",
                )

    async def _make_request(self, method, endpoint, **kwargs):
        async with httpx.AsyncClient() as client:
            response = await getattr(client, method)(
                f"{self.base_url}/{endpoint}", timeout=self.timeout, **kwargs
            )

            return response
