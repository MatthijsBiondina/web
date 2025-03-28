import random
from mongoengine import (
    Document,
    StringField,
    ReferenceField,
    FloatField,
    IntField,
    DateTimeField,
    BooleanField,
)
from app.models.mongo.user_models import UserDocument
from datetime import datetime


class OrderNumberSequence(Document):
    name = StringField(required=True, unique=True)
    next_value = IntField(required=True, default=21734)

    meta = {"collection": "sequences", "indexes": ["name"]}

    @classmethod
    def get_next_value(cls):
        sequence = cls.objects(name="order_number").modify(
            upsert=True, new=True, inc__next_value=random.randint(1, 10)
        )
        return sequence.next_value


class OrderDocument(Document):
    PAYMENT_STATUS_CHOICES = [
        "open",
        "pending",
        "authorized",
        "paid",
        "canceled",
        "expired",
        "failed",
    ]
    order_number = StringField(required=True, unique=True)
    payment_id = StringField(required=True, unique=True)
    user = ReferenceField(UserDocument, required=True)
    amount = FloatField(required=True)
    currency = StringField(required=True)
    product = StringField(required=True)

    status = StringField(required=True, default="open")
    processed = BooleanField(required=True, default=False)
    requires_manual_review = BooleanField(required=True, default=False)
    created_at = DateTimeField(required=True, default=datetime.now)
    updated_at = DateTimeField(required=True, default=datetime.now)

    meta = {"collection": "orders", "indexes": ["order_number", "payment_id"]}
