from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from .config import settings


_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_secret(value: str) -> str:
    return _pwd_context.hash(value)


def verify_secret(value: str, hashed_value: str) -> bool:
    return _pwd_context.verify(value, hashed_value)


def create_access_token(subject: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.jwt_exp_minutes)
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(
        payload,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm,
    )
