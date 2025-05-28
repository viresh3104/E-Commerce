from pydantic import BaseModel, EmailStr
from typing import Optional

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr

class AuthResponse(BaseModel):
    access_token: str
    refresh_token: Optional[str]
    user: UserResponse
