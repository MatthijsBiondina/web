# app/routes/credit_routes.py
from fastapi import APIRouter, Depends
import logging

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.models.schemas.credit_schemas import (
    CreditBalanceResponse,
    CreditCheckRequest,
    CreditCheckResponse,
)
from app.services.credit_service import CreditService


router = APIRouter()


@router.get("/balance")
async def get_balance_route(
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    balance = CreditService.get_balance(user)

    return CreditBalanceResponse(amount=balance)


@router.get("/check-sufficient-credits")
async def check_sufficient_credits_route(
    request: CreditCheckRequest = Depends(),
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    sufficient = CreditService.check_sufficient_credits(request.task_type, user)

    return CreditCheckResponse(sufficient=sufficient)
