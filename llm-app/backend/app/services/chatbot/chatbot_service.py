import logging
from threading import Thread
import time
from bson import ObjectId

from app.models.mongo.chat_models import ChatDocument, ChatMessageDocument
from app.models.mongo.user_models import UserDocument
from app.services.chatbot.gpt_connection import GPT4O

logger = logging.getLogger(__name__)


class ChatbotService:
    NR_OF_ATTEMPTS = 3

    @staticmethod
    def run(user, chat_id: str):
        process = Thread(
            target=ChatbotService._get_chatbot_response, args=(user, chat_id)
        )
        process.start()

    @staticmethod
    def _get_chatbot_response(user: UserDocument, chat_id: str):
        chat = ChatDocument.objects(user=user, id=chat_id).first()

        gpt = GPT4O()
        for attempt_nr in range(ChatbotService.NR_OF_ATTEMPTS):
            logger.info(f"Attempt {attempt_nr} of {ChatbotService.NR_OF_ATTEMPTS}")
            if gpt.check_if_message_is_in_knowledge_base(chat):
                logger.info("Message is in knowledge base")
                answer = gpt.get_answer_from_knowledge_base(chat)
                if answer:
                    logger.info("Answer found in knowledge base")
                    ChatbotService._update_assistant_response(user, chat, answer)
                    return True
            else:
                logger.info("Message is not in knowledge base")
                ChatbotService._update_assistant_response(
                    user,
                    chat,
                    "Ik heb het antwoord niet gevonden in mijn kennis.",
                    status="failed",
                )
                return False

        logger.info("No answer found in knowledge base")
        ChatbotService._update_assistant_response(
            user,
            chat,
            "Er is iets mis gegaan",
            status="failed",
        )
        return False

    @staticmethod
    def _update_assistant_response(
        user: UserDocument, chat: ChatDocument, answer: str, status="success"
    ):
        logger.info(f"Updating assistant response with status: {status}")
        ChatMessageDocument.objects(
            user=user, id=ObjectId(chat.messages[-1].id), sender="assistant"
        ).update_one(
            set__status=status,
            set__text=answer,
        )
