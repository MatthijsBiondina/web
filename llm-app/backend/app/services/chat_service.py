import logging

from fastapi import HTTPException
from bson import ObjectId
from app.models.mongo.chat_models import ChatDocument, ChatMessageDocument
from app.models.mongo.user_models import UserDocument
from app.services.credit_service import CreditService
from app.services.settings_service import SettingsService
from app.services.uchat_service import UChatService

logger = logging.getLogger(__name__)


class ChatService:
    @staticmethod
    def send_message(user: UserDocument, text: str, chat_id: str | None = None):
        chat = ChatService._get_or_create_chat(user, chat_id)
        user_message = ChatMessageDocument(
            user=user,
            text=text,
            sender="user",
            status="completed",
        )
        user_message.save()
        assistant_message = ChatMessageDocument(
            user=user,
            text=None,
            sender="assistant",
            status="pending",
        )
        assistant_message.save()
        ChatDocument.objects(id=chat.id).update_one(push__messages=user_message)
        ChatDocument.objects(id=chat.id).update_one(push__messages=assistant_message)
        UChatService.run(user, chat.id)
        return chat.id

    @staticmethod
    def check_message_status(user: UserDocument, chat_id: str):

        chat = ChatDocument.objects(user=user, id=ObjectId(chat_id)).first()
        if chat:
            assistant_message = chat.messages[-1]
            if assistant_message.status == "completed":
                message = assistant_message.text
                return "completed", message
            else:
                return "pending", None
        else:
            raise RuntimeError("Chat not found")

    @staticmethod
    def _get_or_create_chat(user: UserDocument, chat_id: str | None = None):
        if chat_id is None:
            return ChatService._create_new_chat(user)
        else:
            return ChatDocument.objects.get(id=ObjectId(chat_id))

    @staticmethod
    def _create_new_chat(user: UserDocument):
        if not CreditService.check_sufficient_credits("chat-session", user):
            raise RuntimeError("Not enough credits")
        CreditService.deduct_credits("chat-session", user)

        initial_message = ChatMessageDocument(
            user=user,
            text=SettingsService.get_setting("chat_initial_message"),
            sender="assistant",
            status="completed",
        )
        initial_message.save()
        chat = ChatDocument(
            user=user,
            messages=[initial_message],
        )
        chat.save()
        return chat
