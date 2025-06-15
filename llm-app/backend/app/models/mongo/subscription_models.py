from mongoengine import (
    Document,
    StringField,
    DateTimeField,
    ReferenceField,
    DecimalField,
    BooleanField,
)
from datetime import datetime
from app.models.mongo.user_models import UserDocument


class SubscriptionDocument(Document):
    SUBSCRIPTION_LEVELS = ["free", "standard"]
    SUBSCRIPTION_INTERVALS = ["month"]
    SUBSCRIPTION_STATUS = ["pending", "active", "cancelled", "suspended"]

    user = ReferenceField(UserDocument, required=True)
    level = StringField(required=True, choices=SUBSCRIPTION_LEVELS, default="free")

    mollie_subscription_id = StringField(required=False)
    mollie_customer_id = StringField(required=False)

    # Subscription details
    amount = DecimalField(required=True, precision=2, default=0)
    currency = StringField(required=True, max_length=3, default="EUR")
    interval = StringField(
        required=True, choices=SUBSCRIPTION_INTERVALS, default="month"
    )

    # Status tracking
    status = StringField(required=True, choices=SUBSCRIPTION_STATUS, default="pending")

    # Dates
    start_date = DateTimeField(required=False)
    next_payment_date = DateTimeField(required=False)
    cancelled_at = DateTimeField(required=False)

    # Metadata
    created_at = DateTimeField(required=True, default=datetime.now)
    updated_at = DateTimeField(required=True, default=datetime.now)

    # For manual review if needed
    requires_manual_review = BooleanField(required=True, default=False)

    meta = {
        "collection": "subscriptions",
        "indexes": ["user", "mollie_subscription_id", "status", "created_at"],
    }

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "level": self.level,
            "amount": self.amount,
            "currency": self.currency,
            "interval": self.interval,
            "status": self.status,
            "start_date": self.start_date,
            "next_payment_date": self.next_payment_date,
            "cancelled_at": self.cancelled_at,
            "created_at": self.created_at,
        }
