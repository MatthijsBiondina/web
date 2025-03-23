from mongoengine import Document, StringField, IntField, DateTimeField, ReferenceField
from datetime import datetime
from app.models.mongo.user_models import UserDocument


class SubscriptionDocument(Document):
    SUBSCRIPTION_LEVELS = ["free", "standard", "premium"]

    user = ReferenceField(UserDocument, required=True)
    level = StringField(required=True, choices=SUBSCRIPTION_LEVELS, default="free")
    created_at = DateTimeField(required=True, default=datetime.now)
    updated_at = DateTimeField(required=True, default=datetime.now)
    expires_at = DateTimeField(required=False)

    meta = {"collection": "subscriptions"}
