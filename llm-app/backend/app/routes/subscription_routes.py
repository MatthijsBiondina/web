# app/routes/user_routes.py
from fastapi import APIRouter, Depends
import logging

from app.services.subscription_service import SubscriptionService

logger = logging.getLogger(__name__)

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument


router = APIRouter()


# Get current user subscription level
@router.get("/get-subscription-level")
async def get_subscription_level_route(
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    subscription_level = SubscriptionService.get_subscription_level(user)
    return subscription_level
