from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from auth.schemas import Token
from auth.dependecies import ACCESS_TOKEN_EXPIRE_MINUTES, authenticate_user, create_access_token, get_current_active_user

from helpers.models import User_db

auth_router = APIRouter(prefix='/auth', tags=['auth'])


@auth_router.post("/token", response_model=Token)
async def login_for_access_token(user=Depends(authenticate_user)):

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.get("/users/me", response_model=User_db)
async def read_users_me(current_user: User_db = Depends(get_current_active_user)):
    return current_user
