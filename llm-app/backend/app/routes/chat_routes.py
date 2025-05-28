from fastapi import APIRouter, Depends, HTTPException
import logging

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.models.schemas.chat_schemas import (
    CreateChatRequest,
    CreateChatResponse,
    MessageSchema,
    ChatSchema,
    MessageSendRequest,
    MessageStatusRequest,
    MessageSendResponse,
    MessageStatusResponse,
    RetrieveMessagesRequest,
    RetrieveMessagesResponse,
    GetAllChatsResponse,
)
from app.services.chat_service import ChatService

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/create")
async def create_chat_route(
    request: CreateChatRequest,
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    try:
        chat_id = ChatService.create_chat(user, request.subject, request.text)
        return CreateChatResponse(chat_id=str(chat_id))
    except RuntimeError as e:
        raise HTTPException(status_code=402, detail=str(e))


@router.post("/send-message")
async def send_message_route(
    request: MessageSendRequest,
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    try:
        user_message_id, assistant_message_id = ChatService.send_message(
            user, request.text, request.chat_id
        )
    except RuntimeError as e:
        raise HTTPException(status_code=402, detail=str(e))
    return MessageSendResponse(
        user_message_id=str(user_message_id),
        assistant_message_id=str(assistant_message_id),
    )


@router.get("/check-message-status")
async def check_message_status_route(
    request: MessageStatusRequest = Depends(),
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    try:
        status, message = ChatService.check_message_status(user, request.chat_id)
        logger.info(f"Status: {status}, Message: {message}")
        return MessageStatusResponse(
            complete=(status == "success"),
            failed=(status == "failed"),
            message=None if message is None else MessageSchema(**message.to_dict()),
        )
    except RuntimeError as e:
        raise HTTPException(status_code=402, detail=str(e))


@router.get("/retrieve-messages")
async def retrieve_messages_route(
    request: RetrieveMessagesRequest = Depends(),
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    try:
        messages = ChatService.retrieve_messages(user, request.chat_id)
        return RetrieveMessagesResponse(
            messages=[MessageSchema(**message) for message in messages]
        )
    except RuntimeError as e:
        raise HTTPException(status_code=402, detail=str(e))


@router.get("/get-all-chats")
async def get_all_chats_route(
    user: UserDocument = Depends(authorize(Role.VERIFIED_USER)),
):
    try:
        chats = ChatService.get_all_chats(user)
        return GetAllChatsResponse(chats=[ChatSchema(**chat) for chat in chats])
    except RuntimeError as e:
        raise HTTPException(status_code=402, detail=str(e))
