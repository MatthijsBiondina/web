from mongoengine import Document, ReferenceField, StringField, DateTimeField, ListField
from datetime import datetime
from app.models.mongo.user_models import UserDocument


class ChatMessageDocument(Document):
    SENDER_OPTIONS = ["user", "assistant"]
    STATUS_OPTIONS = ["pending", "completed", "failed"]

    user = ReferenceField(UserDocument, required=True)
    text = StringField(required=True, default="")
    sender = StringField(required=True, choices=SENDER_OPTIONS)
    status = StringField(required=True, choices=STATUS_OPTIONS)
    created_at = DateTimeField(required=True, default=datetime.now)
    updated_at = DateTimeField(required=True, default=datetime.now)

    meta = {
        "collection": "chat_messages",
        "indexes": ["user"],
        "ordering": ["created_at"],
    }

    def __str__(self):
        return f"ChatMessage(user={self.user}, text={self.text}, sender={self.sender}, created_at={self.created_at})"


class ChatDocument(Document):
    user = ReferenceField(UserDocument, required=True)
    messages = ListField(ReferenceField(ChatMessageDocument), required=True)
    created_at = DateTimeField(required=True, default=datetime.now)
    updated_at = DateTimeField(required=True, default=datetime.now)

    meta = {"collection": "chats", "indexes": ["user"], "ordering": ["created_at"]}

    def __str__(self):
        return f"Chat(user={self.user}, created_at={self.created_at})"
