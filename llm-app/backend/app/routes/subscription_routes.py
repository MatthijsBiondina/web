# app/routes/user_routes.py
from http.client import HTTPException
from fastapi import APIRouter, Depends
import logging

from app.models.schemas.order_schemas import RedirectUrlResponse
from app.models.schemas.subscription_schemas import (
    CancelSubscriptionRequest,
    CreateSubscriptionRequest,
    SubscriptionResponse,
    SubscriptionStatusResponse,
)
from app.services.subscription_service import SubscriptionService

logger = logging.getLogger(__name__)

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument


router = APIRouter()


@router.get("/", response_model=SubscriptionResponse)
async def get_user_subscription_route(
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    raise NotImplementedError("Not implemented")


@router.get("/status", response_model=SubscriptionStatusResponse)
async def get_subscription_status_route(
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    try:
        subscription = SubscriptionService.get_subscription(user)

        return SubscriptionStatusResponse(
            subscription_level=subscription.level,
            subscription_active=SubscriptionService.is_subscription_active(
                subscription
            ),
            active_subscription=SubscriptionResponse(**subscription.to_dict()),
        )
    except Exception as e:
        logger.error(f"Error getting subscription status: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/create", response_model=RedirectUrlResponse)
async def create_subscription_route(
    request: CreateSubscriptionRequest,
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    active_subscription = SubscriptionService.get_subscription(user)
    if active_subscription.level != "free":
        raise HTTPException(
            status_code=400, detail="User already has an active subscription"
        )

    checkout_url = SubscriptionService.create_subscription(
        user=user,
        product_key="standard",
    )

    return RedirectUrlResponse(url=checkout_url)

    raise NotImplementedError("Not implemented")


@router.post("/cancel", response_model=SubscriptionResponse)
async def cancel_subscription_route(
    request: CancelSubscriptionRequest,
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    raise NotImplementedError("Not implemented")


@router.get("/{subscription_id}", response_model=SubscriptionResponse)
async def get_subscription_route(
    subscription_id: str,
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    raise NotImplementedError("Not implemented")
