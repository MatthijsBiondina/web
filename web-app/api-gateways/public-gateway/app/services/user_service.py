import httpx
from fastapi import HTTPException, status

from app.config import settings


class UserServiceClient:
    """
    Client for communicating with the user service
    """

    def __init__(self):
        self.base_url = settings.USER_SERVICE_URL
        self.timeout = 10.0

    async def create_user(self, user_data: dict):
        """
        Create or update a user with the user service
        """
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/users", json=user_data, timeout=self.timeout
                )

                if response.status_code == 200:
                    return response.json()
                else:
                    print(
                        f"Unexpected response from user service: {response.status_code}"
                    )
                    response.raise_for_status()
            except httpx.RequestError as e:
                print(f"Error connecting to user service: {str(e)}")
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail="User service unavailable",
                )

    async def get_profile(self, uid: str):
        """
        Get a suer's profile from the user service"""
        async with httpx.AsyncClient() as client:
            try:
                # Use token to get user profile
                response = await client.get(
                    f"{self.base_url}/users/profile",
                    headers={"X-User-ID": uid},
                    timeout=self.timeout,
                )
                if response.status_code == 200:
                    return response.json()
                elif response.status_code == 404:
                    # User not found
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
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
