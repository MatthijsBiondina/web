from app.models.mongo.credit_models import CreditBalanceDocument
from app.models.mongo.service_models import ServicePriceDocument
from app.models.mongo.user_models import UserDocument
from app.services.settings_service import SettingsService
import logging

logger = logging.getLogger(__name__)


class CreditService:
    @staticmethod
    def get_balance(user: UserDocument):
        balance = CreditService.__get_or_create_balance(user)
        return balance.amount / 100

    @staticmethod
    def check_sufficient_credits(task_type: str, user: UserDocument):
        balance = CreditService.__get_or_create_balance(user)
        service_price = ServicePriceDocument.objects.get(service_name=task_type)

        return balance.amount >= service_price.amount

    @staticmethod
    def __get_or_create_balance(user: UserDocument):
        try:
            balance = CreditBalanceDocument.objects.get(user=user)
        except CreditBalanceDocument.DoesNotExist:
            free_credits_on_signup = SettingsService.get_setting(
                "free_credits_on_signup", 0
            )
            balance = CreditBalanceDocument(user=user, amount=free_credits_on_signup)
            balance.save()
        return balance
