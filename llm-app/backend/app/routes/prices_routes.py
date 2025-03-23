from fastapi import APIRouter, Depends

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.models.schemas.price_schemas import (
    CreditPriceRequest,
    CreditPriceResponse,
    OneTimeAccessPriceResponse,
)
from app.services.price_service import PriceService

router = APIRouter()


@router.get("/credit-price")
async def get_credit_price(
    request: CreditPriceRequest = Depends(),
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    price, credits = PriceService.get_credit_price(request.product)
    return CreditPriceResponse(price=price, credits=credits)


@router.get("/one-time-access")
async def get_one_time_access_price(
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    price = PriceService.get_one_time_access_price(user)
    return OneTimeAccessPriceResponse(price=price)
