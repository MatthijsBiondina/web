from datetime import datetime
from typing import Dict, List, Optional
from app.models.user import UserCreate, UserUpdate, UserInDB

class DummyDB:
    """
    A simple in-memory database for development and testing
    """
    def __init__(self):
        """Initialize with some dummy data"""
        self.users: Dict[str, UserInDB] = {
            "user1": UserInDB(
                uid="user1",
                email="john.doe@example.com",
                displayName="John Doe",
                photoURL="https://example.com/john.jpg",
                hasAcceptedTerms=True,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            ),
            "user2": UserInDB(
                uid="user2",
                email="jane.smith@example.com",
                displayName="Jane Smith",
                photoURL="https://example.com/jane.jpg",
                hasAcceptedTerms=False,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
        }
    
    async def get_user_by_uid(self, uid: str) -> Optional[UserInDB]:
        """Get a user by UID"""
        return self.users.get(uid)
    
    async def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        """Get a user by email"""
        for user in self.users.values():
            if user.email == email:
                return user
        return None
    
    async def create_user(self, user_data: UserCreate) -> UserInDB:
        """Create a new user or update if exists"""
        now = datetime.utcnow()
        
        # Check if user already exists
        existing_user = await self.get_user_by_uid(user_data.uid)
        
        if existing_user:
            # Update existing user
            for key, value in user_data.dict().items():
                if value is not None:
                    setattr(existing_user, key, value)
            
            existing_user.updated_at = now
            return existing_user
        else:
            # Create new user
            new_user = UserInDB(
                **user_data.dict(),
                created_at=now,
                updated_at=now
            )
            self.users[user_data.uid] = new_user
            return new_user
    
    async def update_user(self, uid: str, user_data: UserUpdate) -> Optional[UserInDB]:
        """Update a user"""
        user = await self.get_user_by_uid(uid)
        
        if not user:
            return None
        
        # Update fields
        update_data = user_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            if value is not None:  # Skip None values
                setattr(user, key, value)
        
        user.updated_at = datetime.utcnow()
        return user
    
    async def delete_user(self, uid: str) -> bool:
        """Delete a user"""
        if uid in self.users:
            del self.users[uid]
            return True
        return False
    
    async def list_users(self) -> List[UserInDB]:
        """List all users"""
        return list(self.users.values())

# Create a singleton instance
dummy_db = DummyDB()