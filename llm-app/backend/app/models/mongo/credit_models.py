from mongoengine import Document, IntField, DateTimeField, ReferenceField, StringField
from datetime import datetime
from app.models.mongo.user_models import UserDocument


class CreditBalanceDocument(Document):
    user = ReferenceField(UserDocument, required=True)
    amount = IntField(required=True, default=0)
    updated_at = DateTimeField(required=True, default=datetime.now)

    meta = {"collection": "credit_balances", "indexes": ["user"]}

    def __str__(self):
        return f"CreditBalance(user={self.user}, amount={self.amount})"


class CreditPriceDocument(Document):
    key = StringField(required=True, unique=True)
    amount_cents = IntField(required=True)
    amount_credits = IntField(required=True)
    currency = StringField(required=True, default="eur")
    currency_symbol = StringField(required=True, default="€")

    meta = {"collection": "credit_prices", "indexes": ["key"]}

    def __str__(self):
        return f"CreditPricing(key={self.key}, amount_cents={self.amount_cents}, amount_credits={self.amount_credits}, currency={self.currency}, currency_symbol={self.currency_symbol})"
