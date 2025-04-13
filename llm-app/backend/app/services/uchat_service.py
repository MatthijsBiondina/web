import logging
from threading import Thread
import time
from bson import ObjectId

from app.models.mongo.chat_models import ChatDocument, ChatMessageDocument
from app.models.mongo.user_models import UserDocument

logger = logging.getLogger(__name__)


class UChatService:
    @staticmethod
    def run(user, chat_id: str):
        process = Thread(target=UChatService._get_uchat_response, args=(user, chat_id))
        process.start()

    @staticmethod
    def _get_uchat_response(user: UserDocument, chat_id: str):
        chat = ChatDocument.objects(user=user, id=chat_id).first()
        logger.info(f"Chat: {str(chat)}")
        time.sleep(10)

        if chat:
            ChatMessageDocument.objects(
                user=user, id=ObjectId(chat.messages[-1].id), sender="assistant"
            ).update_one(
                set__status="completed",
                set__text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            )
            return True
        else:
            logger.error(f"Chat not found: {chat_id}")
            return False
