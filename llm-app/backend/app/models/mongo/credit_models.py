from mongoengine import Document, IntField, DateTimeField, ReferenceField
from datetime import datetime
from app.models.mongo.user_models import UserDocument


class CreditBalanceDocument(Document):
    user = ReferenceField(UserDocument, required=True)
    amount = IntField(required=True, default=0)
    updated_at = DateTimeField(required=True, default=datetime.now)

    meta = {"collection": "credit_balances", "indexes": ["user"]}

    def __str__(self):
        return f"CreditBalance(user={self.user}, amount={self.amount})"
