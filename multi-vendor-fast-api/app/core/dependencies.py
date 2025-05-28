from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.core.config import SECRET_KEY, ALGORITHM
from app.db.mongo import get_user_collection
from app.models.user import user_helper
from bson import ObjectId

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        users = get_user_collection()
        user = await users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user_helper(user)
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")


def require_role(role: str):
    async def role_checker(current_user=Depends(get_current_user)):
        if current_user["role"] != role:
            raise HTTPException(status_code=403, detail="You are not authorized")
        return current_user
    return role_checker