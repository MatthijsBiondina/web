# app/routes/user_routes.py
from fastapi import APIRouter, Depends
import logging

from app.services.user_service import UserService

logger = logging.getLogger(__name__)

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.models.schemas.user_schemas import ProfileCreate, ProfileUpdate, UserResponse


router = APIRouter()


@router.post("/")
async def post_user_route(
    profile_data: ProfileCreate,
    user: UserDocument = Depends(authorize(Role.UNVERIFIED_USER)),
):
    updated_user = UserService.update_user_profile(user, profile_data)
    return UserResponse(**updated_user.to_dict())


# Get current user profile
@router.get("/profile")
async def get_profile_route(
    user: UserDocument = Depends(authorize(Role.UNVERIFIED_USER)),
):
    return UserResponse(**user.to_dict())


# Update user profile
@router.put("/profile")
async def put_profile_route(
    profile_data: ProfileUpdate,
    user: UserDocument = Depends(authorize(Role.UNVERIFIED_USER)),
):
    updated_user = UserService.update_user_profile(user, profile_data)
    return UserResponse(**updated_user.to_dict())
