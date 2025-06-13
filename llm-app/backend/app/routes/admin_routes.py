from fastapi import APIRouter, Depends, HTTPException
import logging

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.models.mongo.user_models import UserDocument
from app.models.schemas.admin_schemas import GetAllChatsRequest, GetAllChatsResponse
from app.services.chat_service import ChatService

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/chats-database/get-all-chats")
async def get_all_chats(
    request: GetAllChatsRequest = Depends(),
    user: UserDocument = Depends(authorize(Role.ADMIN)),
):
    try:
        chats, total_pages, total_chats = ChatService.get_chats_for_admin(
            user, request.page_number
        )
        return GetAllChatsResponse(
            chats=chats, total_pages=total_pages, total_chats=total_chats
        )
    except Exception as e:
        logger.error(f"Error getting all chats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/chats-database/clear-chats-database")
async def clear_chats_database(
    user: UserDocument = Depends(authorize(Role.ADMIN)),
):
    try:
        ChatService.clear_chats_database(user)
        return {"message": "Chats database cleared successfully"}
    except Exception as e:
        logger.error(f"Error clearing chats database: {e}")
        raise HTTPException(status_code=500, detail=str(e))
