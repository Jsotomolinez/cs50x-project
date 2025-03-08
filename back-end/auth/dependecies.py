#################### python utils ####################
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta, timezone
from typing import Annotated

#################### fastapi ####################
import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
# from pydantic import BaseModel

#################### sqlalchemy ####################
from sqlalchemy.orm import Session

#################### db ####################
from db.connection import get_db

#################### schemas ####################
from .schemas import TokenData
from db.schema import User
from helpers.models import User_db

#################### helpers ####################


load_dotenv(os.path.join(os.path.dirname(__file__), '../.secrets'))
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

if not SECRET_KEY or not ALGORITHM or not ACCESS_TOKEN_EXPIRE_MINUTES:
    raise ValueError("Environment variables SECRET_KEY, ALGORITHM, and ACCESS_TOKEN_EXPIRE_MINUTES must be set")

ACCESS_TOKEN_EXPIRE_MINUTES = int(ACCESS_TOKEN_EXPIRE_MINUTES)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db: Session, username: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    return User_db.model_validate(user)


def authenticate_user(
        db: Session = Depends(get_db),
        form_data: OAuth2PasswordRequestForm = Depends()
        ):
    user = get_user(db=db, username=form_data.username)
    if not user:
        return False
    if not verify_password(form_data.password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except jwt.PyJWTError:
        raise credentials_exception
    user = get_user(db=db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User_db = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user