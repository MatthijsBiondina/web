import logging
from typing import Tuple

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
    def create_chat(user: UserDocument, subject: str, text: str):
        chat = ChatService._create_new_chat(user, subject)
        ChatService._add_new_user_prompt(chat, user, text)
        return chat.id

    @staticmethod
    def send_message(user: UserDocument, text: str, chat_id: str):
        chat = ChatService._get_chat(user, chat_id)
        user_message, assistant_message = ChatService._add_new_user_prompt(
            chat, user, text
        )

        return user_message.id, assistant_message.id

    @staticmethod
    def check_message_status(
        user: UserDocument, chat_id: str
    ) -> Tuple[str, ChatMessageDocument | None]:

        chat = ChatDocument.objects(user=user, id=ObjectId(chat_id)).first()
        if chat:
            assistant_message = chat.messages[-1]
            if assistant_message.status == "completed":
                return "completed", assistant_message
            else:
                return "pending", None
        else:
            raise RuntimeError("Chat not found")

    @staticmethod
    def retrieve_messages(user: UserDocument, chat_id: str):
        chat = ChatDocument.objects(user=user, id=ObjectId(chat_id)).first()
        if chat:
            return [message.to_dict() for message in chat.messages]
        else:
            raise RuntimeError("Chat not found")

    @staticmethod
    def _get_chat(user: UserDocument, chat_id: str | None = None):
        if chat_id is None:
            raise RuntimeError("Chat ID is required")
        else:
            return ChatDocument.objects.get(id=ObjectId(chat_id), user=user)

    @staticmethod
    def _create_new_chat(user: UserDocument, subject: str):
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
            subject=subject,
            messages=[initial_message],
        )
        chat.save()
        return chat

    @staticmethod
    def _add_new_user_prompt(chat: ChatDocument, user: UserDocument, text: str):
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

        ChatDocument.objects(id=chat.id).update_one(
            push_all__messages=[user_message, assistant_message]
        )
        UChatService.run(user, chat.id)
        return user_message, assistant_message
