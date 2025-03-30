from fastapi import APIRouter, Depends, HTTPException
import logging

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.models.schemas.chat_schemas import (
    MessageSendRequest,
    MessageStatusRequest,
    MessageSendResponse,
    MessageStatusResponse,
)
from app.services.chat_service import ChatService

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/send-message")
async def send_message_route(
    request: MessageSendRequest,
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    try:
        chat_id = ChatService.send_message(user, request.text, request.chat_id)
    except RuntimeError as e:
        raise HTTPException(status_code=402, detail=str(e))
    return MessageSendResponse(chat_id=str(chat_id))


@router.get("/check-message-status")
async def check_message_status_route(
    request: MessageStatusRequest = Depends(),
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    try:
        status, message = ChatService.check_message_status(user, request.chat_id)
        return MessageStatusResponse(complete=(status == "completed"), message=message)
    except RuntimeError as e:
        raise HTTPException(status_code=402, detail=str(e))
