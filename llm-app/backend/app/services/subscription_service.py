import datetime
import logging
import os

import mollie
from app.models.mongo.credit_models import CreditPriceDocument
from app.models.mongo.order_models import OrderDocument, OrderNumberSequence
from app.models.mongo.subscription_models import SubscriptionDocument
from app.models.mongo.user_models import UserDocument
from app.services.mollie_service import MollieService


logger = logging.getLogger(__name__)


class SubscriptionService:
    @staticmethod
    def get_subscription_level(user: UserDocument):
        subscription = SubscriptionService.__get_subscription_or_create_placeholder(
            user
        )
        return subscription.level

    @staticmethod
    def __get_subscription_or_create_placeholder(user: UserDocument):
        try:
            subscription = SubscriptionDocument.objects.get(user=user)
        except SubscriptionDocument.DoesNotExist:
            subscription = SubscriptionDocument(user=user)
            subscription.save()
        return subscription

    @staticmethod
    def get_subscription(user: UserDocument):
        try:
            subscription = SubscriptionService.__get_subscription_or_create_placeholder(
                user
            )
            return subscription
        except Exception as e:
            logger.error(
                f"Error fetching subscription for user {str(user.id)}: {str(e)}"
            )
            raise

    @staticmethod
    def create_subscription(user: UserDocument, product_key: str):
        valid_mandates = SubscriptionService.check_customer_mandates(user)

        if len(valid_mandates) > 0:
            redirect_url = SubscriptionService.create_subscription_after_mandate(user)
        else:
            redirect_url = SubscriptionService.create_first_payment(user, "standard")

        return redirect_url

    @staticmethod
    def create_first_payment(user: UserDocument, product_key: str):
        """
        Create a subscription by first creating a mandate through an initial payment.
        This is required by Mollie before recurring subscriptions can be set up."""
        try:
            # Get customer ID from user or create customer if needed
            customer_id = SubscriptionService._ensure_mollie_customer(user)

            # Get subscription details
            subscription_details = SubscriptionService._get_subscription_details(
                product_key
            )

            # Create order number
            order_number = f"SUB-{OrderNumberSequence.get_next_value():06d}"

            # Create first payment to establish mandate
            redirect_url = (
                f"{os.getenv('FRONTEND_URL')}/portaal/abonnementen/bevestiging"
            )
            webhook_url = (
                f"{os.getenv('BACKEND_URL')}/api/webhooks/mollie/subscription-setup"
            )

            payment_data = {
                "amount": {
                    "value": str(subscription_details["amount"]),
                    "currency": subscription_details["currency"],
                },
                "description": f"Professor Dog - Eerste betaling abonnement ({order_number})",
                "redirectUrl": redirect_url,
                "webhookUrl": webhook_url,
                "customerId": customer_id,
                "sequenceType": "first",  # This is crucial for mandate creation
                "metadata": {
                    "user_id": str(user.id),
                    "product_key": product_key,
                    "subscription_setup": "true",
                    "order_number": order_number,
                },
            }

            mollie_client = MollieService.get_client()
            payment = mollie_client.payments.create(payment_data)

            # Create order record for the first payment
            order = OrderDocument(
                user=user,
                order_number=order_number,
                payment_id=payment.id,
                amount=subscription_details["amount"],
                currency=subscription_details["currency"],
                product=f"subscription-setup-{product_key}",
            )
            order.save()

            return payment.checkout_url

        except mollie.api.error.UnprocessableEntityError as e:
            logger.error(f"Error creating subscription setup payment: {str(e)}")
            raise Exception(f"Payment creation failed: {str(e)}")
        except Exception as e:
            logger.error(f"Error creating subscription setup: {str(e)}")
            raise

    @staticmethod
    def create_subscription_after_mandate(
        user: UserDocument,
        next_payment_date: datetime.date | None = None,
    ):
        assert (
            next_payment_date is None
            or type(next_payment_date) == datetime.date
            or type(next_payment_date) == datetime.datetime
        ), f"next_payment_date must be None or a datetime.date or datetime.datetime, got {next_payment_date} ({type(next_payment_date)})"
        try:
            customer_id = SubscriptionService._ensure_mollie_customer(user)

            mollie_client = MollieService.get_client()
            customer = mollie_client.customers.get(customer_id)
            mandate_id = SubscriptionService.check_customer_mandates(user)[0]["id"]

            # Get subscription details
            subscription_details = SubscriptionService._get_subscription_details(
                "standard"
            )

            if next_payment_date is None:
                next_payment_date = datetime.datetime.now()

            logger.info(type(next_payment_date))

            subscription_data = {
                "amount": {
                    "value": str(subscription_details["amount"]),
                    "currency": subscription_details["currency"],
                },
                "interval": subscription_details["interval"],
                "description": subscription_details["description"],
                "startDate": next_payment_date.strftime("%Y-%m-%d"),
                "webhookUrl": f"{os.getenv('BACKEND_URL')}/api/webhooks/mollie/subscription",
                "mandateId": mandate_id,
                "metadata": {
                    "user_id": str(user.id),
                    "product_key": "subscription-standard-monthly",
                },
            }

            # Create subscription with Mollie
            mollie_subscription = customer.subscriptions.create(subscription_data)

            # Save subscription to database
            subscription = SubscriptionService.__get_subscription_or_create_placeholder(
                user
            )
            subscription.update(
                set__level="standard",
                set__mollie_subscription_id=mollie_subscription.id,
                set__mollie_customer_id=customer_id,
                set__amount=subscription_details["amount"],
                set__currency=subscription_details["currency"],
                set__interval=subscription_details["interval"],
                set__status="active",
                set__start_date=datetime.datetime.now(),
                set__next_payment_date=next_payment_date,
                set__created_at=datetime.datetime.now(),
                set__updated_at=datetime.datetime.now(),
                set__requires_manual_review=False,
            )
            subscription.save()
        except Exception as e:
            logger.error(f"Error creating subscription: {e}")
            raise

        return os.getenv("FRONTEND_URL") + "/portaal/abonnementen/bevestiging"

    @staticmethod
    def cancel_subscription(user: UserDocument, subscription_id: str) -> bool:
        raise NotImplementedError("Not implemented")

    @staticmethod
    def sync_subscription_status(mollie_subscription_id: str) -> bool:
        raise NotImplementedError("Not implemented")

    @staticmethod
    def is_subscription_active(subscription: SubscriptionDocument) -> bool:
        if subscription.level == "free":
            return True
        elif subscription.level == "standard":
            return (
                subscription.next_payment_date
                > datetime.datetime.now() - datetime.timedelta(days=1)
            )
        else:
            return False

    @staticmethod
    def check_customer_mandates(user: UserDocument) -> list:
        try:
            if not hasattr(user, "mollie_customer_id") or not user.mollie_customer_id:
                return []

            mollie_client = MollieService.get_client()
            customer = mollie_client.customers.get(user.mollie_customer_id)
            mandates = customer.mandates.list()

            valid_mandates = [
                mandate for mandate in mandates if mandate.status == "valid"
            ]
            return valid_mandates

        except Exception as e:
            logger.error(f"Error checking customer mandates: {e}")
            return []

    @staticmethod
    def _ensure_mollie_customer(user: UserDocument) -> str:
        mollie_client = MollieService.get_client()

        if hasattr(user, "mollie_customer_id") and user.mollie_customer_id:
            try:
                mollie_customer = mollie_client.customers.get(user.mollie_customer_id)
                return user.mollie_customer_id
            except mollie.api.error.ResponseError as e:
                if e.status == 410:
                    pass
                else:
                    raise e

        # create customer in Mollie
        mollie_customer = mollie_client.customers.create(
            {
                "name": user.display_name,
                "email": user.email,
                "metadata": {
                    "user_id": str(user.id),
                },
            }
        )

        user.update(
            set__mollie_customer_id=mollie_customer.id,
        )
        user.save()
        return mollie_customer.id

    @staticmethod
    def _get_subscription_details(product_key: str) -> dict:
        if product_key == "standard":
            credit_price = CreditPriceDocument.objects.get(
                key="subscription-standard-monthly"
            )
            amount = credit_price.amount_cents / 100
            currency = credit_price.currency
            return {
                "amount": amount,
                "currency": currency,
                "interval": "1 month",
                "description": "Professor Dog - Maandelijks Abonnement",
            }
        else:
            raise ValueError(f"Invalid product key: {product_key}")

    @staticmethod
    def _get_subscription_checkout_url(mollie_subscription) -> str:
        raise NotImplementedError("Not implemented")
