from app.models.mongo.credit_models import (
    CreditBalanceDocument,
    CreditOperationDocument,
)
from app.models.mongo.service_models import ServicePriceDocument
from app.models.mongo.user_models import UserDocument
from app.services.price_service import PriceService
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
    def award_credits(product_key: str, user: UserDocument):
        _, credits = PriceService.get_credit_price(product_key)
        _ = CreditService.__get_or_create_balance(user)
        credit_operation = CreditOperationDocument(
            user=user,
            amount=credits,
            operation_type="credit",
            details=f"Awarded {credits} credits for {product_key}",
        )
        credit_operation.save()
        try:
            CreditBalanceDocument.objects(user=user).update_one(inc__amount=credits)
        except Exception as e:
            logger.error(f"Error awarding credits: {e}")
            CreditOperationDocument.objects(
                user=user, id=credit_operation.id
            ).update_one(
                set__status="failed",
                set__details=f"Awarding {credits} credits failed: {str(e)}",
            )
            raise e
        CreditOperationDocument.objects(user=user, id=credit_operation.id).update_one(
            set__status="success"
        )

    @staticmethod
    def deduct_credits(task_type: str, user: UserDocument):
        if not CreditService.check_sufficient_credits(task_type, user):
            raise RuntimeError("Not enough credits")
        service_price = ServicePriceDocument.objects.get(service_name=task_type)

        _ = CreditService.__get_or_create_balance(user)
        credit_operation = CreditOperationDocument(
            user=user,
            amount=-service_price.amount,
            operation_type="debit",
            details=f"Deducted {service_price.amount} credits for {task_type}",
        )
        credit_operation.save()
        try:
            CreditBalanceDocument.objects(user=user).update_one(
                inc__amount=-service_price.amount
            )
        except Exception as e:
            logger.error(f"Error deducting credits: {e}")
            CreditOperationDocument.objects(
                user=user, id=credit_operation.id
            ).update_one(
                set__status="failed",
                set__details=f"Deducting {service_price.amount} credits failed: {str(e)}",
            )
            raise e
        CreditOperationDocument.objects(user=user, id=credit_operation.id).update_one(
            set__status="success"
        )

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
