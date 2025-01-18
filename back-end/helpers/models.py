from pydantic import BaseModel
from typing import List

########### User models ############
class User_info(BaseModel):
    username: str
    email: str
    phone_number: str
    favorites: str

class User_create(BaseModel):
    username: str
    email: str
    password: str
    phone_number: str

class User_db(BaseModel):    
    id: int
    username: str
    email: str
    password: str
    phone_number: str
    favorites: str

    class Config:
        from_attributes = True 


########### Product models ############
class Product_info(BaseModel):
    id: int
    name: str
    description: str
    image: str
    price: float
    department: str
    brand: str
    line: str

class Product_create(BaseModel):
    name: str
    description: str
    image: str
    cost: float
    price: float
    department_id: int
    brand_id: int
    line_id: int
    provider_id: int

class Product_db(BaseModel):
    id: int
    name: str
    description: str
    image: str
    cost: float
    price: float
    department_id: int
    brand_id: int
    line_id: int
    provider_id: int

    class Config:
        from_attributes = True


########### Brand models ############
class Brand_info(BaseModel):
    name: str

class Brand_db(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


########### Department models ############
class Department_info(BaseModel):
    name: str

class Department_db(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


########### Line models ############
class Line_info(BaseModel):
    name: str
    department: str

class Line_db(BaseModel):
    id: int
    name: str
    department_id: int

    class Config:
        from_attributes = True


########### Provider models ############
class Provider_info(BaseModel):
    name: str

class Provider_db(BaseModel):
    id: int
    name: str
    active: bool

    class Config:
        from_attributes = True


########### Transaction models ############

class Transaction_info(BaseModel):
    product_id: int
    quantity: int
    price: float

class Transaction_create(BaseModel):
    user_id: int
    info: List[Transaction_info]
    total_price: float
    date: str

class Transaction_db(BaseModel):
    id: int
    user_id: int
    info: List[Transaction_info]
    total_price: float
    date: str

    class Config:
        from_attributes = True
