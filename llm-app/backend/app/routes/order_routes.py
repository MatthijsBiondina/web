from fastapi import APIRouter, Depends

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.models.schemas.order_schemas import RedirectUrlResponse
from app.services.order_service import OrderService

router = APIRouter()


@router.post("/one-time-access")
async def create_one_time_access_payment(
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    checkout_url = OrderService.create_one_time_access_order(user)

    return RedirectUrlResponse(url=checkout_url)
