from mongoengine import Document, StringField, EmailField, DateTimeField, BooleanField
from datetime import datetime


class User(Document):
    """User model using mongoengine Document"""

    uid = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    hasAcceptedTerms = BooleanField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "users"}

    def to_dict(self):
        """Convert User document to dictionary"""
        return {
            "id": str(self.id),
            "uid": self.uid,
            "email": self.email,
            "hasAcceptedTerms": self.hasAcceptedTerms,
            "created_at": self.created_at.isoformat(),
        }
