# from fastapi import APIRouter, Depends, HTTPException

# from sqlalchemy.orm import Session
# from helpers.models import User_info, User_db, User_create
# from db.connection import get_db
# from db.schema import User

# users_router = APIRouter(prefix='/users', tags=['Users'])

# @users_router.post('/create/', response_model=User_db)
# async def create_user(user: User_create, db: Session = Depends(get_db)):
#     '''Creates a new user'''
#     db_user = User(
#         username = user.username,
#         email = user.email,
#         password = user.password,
#         phone_number = user.phone_number,
#     )
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user


# @users_router.get('/by_id/{user_id}', response_model=User_db)
# async def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
#     '''Returns a user by id'''
#     return db.query(User).filter(User.id == user_id).first()


# @users_router.get('/by_username/{username}', response_model=User_db)
# async def get_user_by_username(username: str, db: Session = Depends(get_db)):
#     '''Returns a user by username'''
#     return db.query(User).filter(User.username == username).first()


# @users_router.get('/by_email/{email}', response_model=User_db)
# async def get_user_by_email(email: str, db: Session = Depends(get_db)):
#     '''Returns a user by email'''
#     return db.query(User).filter(User.email == email).first()


# @users_router.get('/by_phone_number/{phone_number}', response_model=User_db)
# async def get_user_by_phone_number(phone_number: str, db: Session = Depends(get_db)):
#     '''Returns a user by phone number'''
#     return db.query(User).filter(User.phone_number == phone_number).first()


# @users_router.put('/update/{user_id}', response_model=User_db)
# async def update_user(user_id: int, user: User_info, db: Session = Depends(get_db)):
#     '''Updates a user by id'''
#     db_user = db.query(User).filter(User.id == user_id).first()
#     if db_user:
#         db_user.username = user.username
#         db_user.email = user.email
#         db_user.phone_number = user.phone_number
#         db.commit()
#         db.refresh(db_user)
#         return db_user
#     raise HTTPException(status_code=404, detail="User not found")


# @users_router.delete('/delete/{user_id}')
# async def delete_user(user_id: int, db: Session = Depends(get_db)):
#     '''Deletes a user by id'''
#     db_user = db.query(User).filter(User.id == user_id).first()
#     if db_user:
#         db.delete(db_user)
#         db.commit()
#         return {"message": "User deleted"}
#     raise HTTPException(status_code=404, detail="User not found")
