from fastapi import APIRouter, Depends, HTTPException, Response, status
from app.middleware.auth import get_current_user
from app.services.user_service import UserServiceClient
from app.schemas.user import UserResponse, UserUpdate
from app.utils.error_handlers import handle_service_error

router = APIRouter()
user_service = UserServiceClient()


@router.post("/", response_model=UserResponse)
async def create_or_update_user(
    user_data: dict = None, current_user: dict = Depends(get_current_user)
):
    """
    Create or update user in MongoDB after Firebase authentication
    """
    try:
        # Forward user data to user service
        combined_data = {**current_user, **(user_data or {})}
        user = await user_service.create_user(combined_data)
        return user
    except Exception as e:
        # Log the error
        print(f"Error creating/updating user: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating or updating user",
        )


@router.get("/profile", response_model=UserResponse)
async def get_user_profile(current_user: dict = Depends(get_current_user)):
    """
    Get the current user's profile
    """
    response = await handle_service_error(
        "retrieving user profile", user_service.get_profile(current_user["uid"])
    )

    if hasattr(response, "status_code") and response.status_code == 204:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    return response


@router.put("/profile", response_model=UserResponse)
async def update_user_profile(
    update_data: UserUpdate, current_user: dict = Depends(get_current_user)
):
    """
    Update the user's profile
    """
    try:
        # Update profile in user service
        updated_profile = await user_service.update_profile(
            current_user["uid"], update_data.dict(exclude_unset=True)
        )
        return updated_profile
    except Exception as e:
        print(f"Error updating user profile: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error updating user profile",
        )
