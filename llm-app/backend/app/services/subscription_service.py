from app.models.mongo.subscription_models import SubscriptionDocument
from app.models.mongo.user_models import UserDocument


class SubscriptionService:
    @staticmethod
    def get_subscription_level(user: UserDocument):
        subscription = SubscriptionService.__get_or_create_subscription(user)
        return subscription.level

    @staticmethod
    def __get_or_create_subscription(user: UserDocument):
        try:
            subscription = SubscriptionDocument.objects.get(user=user)
        except SubscriptionDocument.DoesNotExist:
            subscription = SubscriptionDocument(user=user)
            subscription.save()
        return subscription
