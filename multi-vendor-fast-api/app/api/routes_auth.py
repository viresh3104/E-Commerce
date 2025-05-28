from fastapi import APIRouter, HTTPException, status, Depends, Body
from app.db.mongo import get_user_collection
from app.schemas.auth import SignupRequest, LoginRequest, AuthResponse
from app.models.user import user_helper
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token
from bson import ObjectId
from app.core.config import SECRET_KEY, ALGORITHM
from jose import JWTError, jwt

router = APIRouter(prefix="/auth")

@router.post("/signup", response_model=AuthResponse)
async def signup(data: SignupRequest):
    users = get_user_collection()
    
    existing = await users.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = hash_password(data.password)
    new_user = {
        "name": data.name,
        "email": data.email,
        "password": hashed
    }
    result = await users.insert_one(new_user)
    user = user_helper({**new_user, "_id": result.inserted_id})
    
    token = create_access_token({"sub": user["id"]})
    refresh_token = create_refresh_token({"sub":user["id"]})
    return {"access_token": token, "user": user, "refresh_token": refresh_token, "user": user}


@router.post("/login", response_model=AuthResponse)
async def login(data: LoginRequest):
    users = get_user_collection()
    
    user_in_db = await users.find_one({"email": data.email})
    if not user_in_db or not verify_password(data.password, user_in_db["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user = user_helper(user_in_db)
    token = create_access_token({"sub": user["id"]})
    refresh_token = create_refresh_token({"sub":user["id"]})
    return {"access_token": token, "user": user, "refresh_token": refresh_token, "user": user}

from fastapi.security import OAuth2PasswordRequestForm

@router.post("/token", response_model=AuthResponse)
async def login_oauth(form_data: OAuth2PasswordRequestForm = Depends()):
    users = get_user_collection()
    
    user_in_db = await users.find_one({"email": form_data.username})
    if not user_in_db or not verify_password(form_data.password, user_in_db["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user = user_helper(user_in_db)
    token = create_access_token({"sub": user["id"]})
    refresh_token = create_refresh_token({"sub":user["id"]})
    return {"access_token": token, "user": user, "refresh_token": refresh_token, "user": user}

@router.post("/refresh-token", response_model=AuthResponse)
async def refresh_token_route(refresh_token: str = Body(...)):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        users = get_user_collection()
        user_in_db = await users.find_one({"_id": ObjectId(user_id)})
        if not user_in_db:
            raise HTTPException(status_code=404, detail="User not found")

        user = user_helper(user_in_db)
        new_access_token = create_access_token({"sub": user["id"]})
        new_refresh_token = create_refresh_token({"sub": user["id"]})

        return {"access_token": new_access_token, "refresh_token": new_refresh_token, "user": user}

    except JWTError:
        raise HTTPException(status_code=403, detail="Refresh token is invalid or expired")
