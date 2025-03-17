import logging
import traceback
from fastapi import APIRouter, HTTPException, Header, status, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from mongoengine.connection import get_db
from typing import Optional

from app.models.user import User

router = APIRouter()

logger = logging.getLogger("users")


@router.post("/")
async def create_or_update_user(user_data: dict = Body(...)):
    """
    Create or update user in database after Firebase authentication

    This endpoint mimics the behavior of your existing Node.js endpoint
    """
    logger.info("User micro-service reached")
    try:
        # Extract Firebase UID and other user info
        uid = user_data.get("uid")
        email = user_data.get("email")
        display_name = user_data.get("displayName")
        photo_url = user_data.get("photoURL")
        has_accepted_terms = user_data.get("hasAcceptedTerms", False)

        if not uid or not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Missing required fields: uid and email",
            )

        # Create user data for database
        user_create = UserCreate(
            uid=uid,
            email=email,
            displayName=display_name,
            photoURL=photo_url,
            hasAcceptedTerms=has_accepted_terms,
        )

        # Create or update user
        user = await dummy_db.create_user(user_create)
        return user

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}",
        )


@router.get("/profile")
async def get_user_profile(x_user_id: Optional[str] = Header(None)):
    """
    Get current user profile

    Uses X-User-ID header which is set by the gateway based on Firebase token
    """
    if not x_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required"
        )

    try:
        user = User.objects.get(uid=x_user_id)
        return JSONResponse(
            status_code=status.HTTP_200_OK, content=jsonable_encoder(user)
        )
    except User.DoesNotExist:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT, detail="User not found"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/profile")
async def update_user_profile(update_data, x_user_id: Optional[str] = Header(None)):
    """
    Update user profile

    Uses X-User-ID header which is set by the gateway based on Firebase token
    """
    if not x_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required"
        )

    # Prevent updating sensitive fields
    if hasattr(update_data, "uid"):
        delattr(update_data, "uid")

    if hasattr(update_data, "email"):
        delattr(update_data, "email")

    # If hasAcceptedTerms is being set to False, remove it
    if update_data.hasAcceptedTerms is False:
        update_data.hasAcceptedTerms = None

    user = await dummy_db.update_user(x_user_id, update_data)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return user
