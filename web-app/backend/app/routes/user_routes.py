# app/routes/users.py
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated

from app.dependencies.authorization import authorize
from app.models.domain.roles import Role
from app.database import db

router = APIRouter()


# Get current user profile
@router.get("/profile")
async def get_profile_route(user=Depends(authorize(Role.PUBLIC))):
    users_collection = db.users

    user = await users_collection.find_one({"uid": firebase_user.get("uid")})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Convert MongoDB _id to string for JSON response
    user["_id"] = str(user["_id"])
    return user


# Update user profile
@router.put("/profile")
async def put_profile_route(user=Depends(authorize(Role.PUBLIC))):
    users_collection = db.users

    # Prepare update data, filtering out None values
    update_data = {k: v for k, v in updates.dict().items() if v is not None}

    # Prevent updating sensitive fields
    if "uid" in update_data:
        del update_data["uid"]
    if "email" in update_data:
        del update_data["email"]

    # Don't allow setting has_accepted_terms to False once accepted
    if update_data.get("has_accepted_terms") is False:
        del update_data["has_accepted_terms"]

    # Update the user
    result = await users_collection.find_one_and_update(
        {"uid": firebase_user.get("uid")}, {"$set": update_data}, return_document=True
    )

    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    # Convert MongoDB _id to string for JSON response
    result["_id"] = str(result["_id"])
    return result
