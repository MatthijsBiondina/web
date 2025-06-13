import datetime
from email.message import EmailMessage
import smtplib
import logging
import os
from app.models.mongo.chat_models import ChatDocument
from app.models.mongo.user_models import UserDocument

logger = logging.getLogger(__name__)


class EmailService:

    @staticmethod
    def ask_professor(
        user: UserDocument, user_name: str, user_email: str, chat_id: str
    ):
        chat = ChatDocument.objects.get(id=chat_id, user=user)
        if chat is None:
            raise RuntimeError("Chat not found")

        body = EmailService._make_body(chat, user, user_name, user_email)
        mail = EmailMessage()
        mail["Subject"] = f"Antwoord niet gevonden - {user_name} - {chat.subject}"
        mail["From"] = "noreply@professordog.nl"
        mail["To"] = "matthijs.biondina@proton.me"
        mail.set_content(body)

        try:
            smtp_server = os.getenv("SMTP_SERVER")
            smtp_port = os.getenv("SMTP_PORT")
            smtp_username = os.getenv("SMTP_USERNAME")
            smtp_password = os.getenv("SMTP_PASSWORD")

            with smtplib.SMTP(smtp_server, smtp_port) as server:
                if all([smtp_server, smtp_username, smtp_password]):
                    server.starttls()
                    server.login(smtp_username, smtp_password)
                server.send_message(mail)

            ChatDocument.objects(id=chat_id).update_one(
                set__email_sent=True,
                set__updated_at=datetime.datetime.now(),
            )
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            raise RuntimeError("Error sending email")

    @staticmethod
    def _make_body(
        chat: ChatDocument, user: UserDocument, user_name: str, user_email: str
    ):
        body = (
            f"De Chatbot kon geen antwoord vinden in het volgende gesprek: \n"
            f"\n"
            f"ONDERWERP:       {chat.subject}\n"
            f"NAAM:  {user.display_name}\n"
            f"EMAIL: {user.email}\n"
        )
        if not user_name == user.display_name or not user_email == user.email:
            body += (
                f"\n"
                f"DE GEBRUIKER HEEFT AANGEGEVEN OP DE VOLGENDE CONTACTGEGEVENS HET ANTWOORD TE WILLEN ONTVANGEN:\n"
                f"NAAM:  {user_name}\n"
                f"EMAIL: {user_email}\n"
            )

        body += f"\n"
        for message in chat.messages:
            body += "#" * 100
            body += f"\n\n"
            body += user_name if message.sender == "user" else "Chatbot"
            body += f" {message.updated_at.strftime(' op %d-%m-%Y om %H:%M:%S')}:\n"
            body += f"{message.text}\n\n"

        return body
