from mongoengine import Document, StringField, BooleanField, ListField, DateTimeField
from datetime import datetime


class UserDocument(Document):
    uid = StringField(required=True, unique=True)
    email = StringField(required=True, unique=True)
    roles = ListField(
        StringField(), required=True, default=["unverified_user", "verified_user"]
    )
    mollie_customer_id = StringField(required=False)
    has_accepted_terms = BooleanField(required=True, default=False)
    display_name = StringField(required=True, default="")
    photo_url = StringField(required=True, default="")
    created_at = DateTimeField(required=True, default=datetime.now)

    meta = {"collection": "users", "indexes": ["uid"]}

    def __str__(self):
        return f"User(uid={self.uid})"

    def to_dict(self):
        return {
            "uid": self.uid,
            "email": self.email,
            "has_accepted_terms": self.has_accepted_terms,
            "admin": "admin" in self.roles,
            "display_name": self.display_name,
            "photo_url": self.photo_url,
            "created_at": self.created_at,
        }
