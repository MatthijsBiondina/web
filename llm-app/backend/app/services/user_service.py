from app.models.mongo.user_models import UserDocument
from typing import Dict, Optional

from app.models.schemas.user_schemas import ProfileUpdate


class UserService:
    @staticmethod
    def get_or_create_user(user_data: Dict) -> UserDocument:
        """
        Get an existing user or create a new one if it doesn't exist.
        Maps Firebase token data to our user model.
        """
        # Try to find existing user
        user = UserDocument.objects(uid=user_data["uid"]).first()

        if not user:
            # Map Firebase token fields to our user model
            user = UserDocument(
                uid=user_data["uid"],
                email=user_data.get("email", ""),
                display_name=user_data.get("name", ""),
                photo_url=user_data.get("picture", ""),
            )
            user.save()

        return user

    @staticmethod
    def update_user_profile(
        user: UserDocument, profile_data: ProfileUpdate
    ) -> UserDocument:
        for field, value in profile_data.model_dump(exclude_unset=True).items():
            if hasattr(user, field):
                setattr(user, field, value)
        user.save()
        return user
