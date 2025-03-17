from app.services.request_service import RequestService
from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.services.user_service import UserServiceClient
from app.schemas.user import UserResponse, UserUpdate
from app.utils.error_handlers import handle_service_error
from app.config import settings

router = APIRouter()
user_service = UserServiceClient()
security = HTTPBearer()


@router.get("/profile", response_model=UserResponse)
async def get_user_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """
    Get the current user's profile
    """
    response = await RequestService(
        settings.USER_SERVICE_URL,
        credentials,
    ).get("/users/profile")

    return response
