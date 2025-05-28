from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from app.core.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_MINUTES

# bcrypt hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_access_token(data: dict):
    return create_token(data, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

def create_refresh_token(data: dict):
    return create_token(data, timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES))