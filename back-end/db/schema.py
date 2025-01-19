import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import CheckConstraint, Column, Integer, String, Float, ForeignKey, Boolean, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from typing import List
import datetime


Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    phone_number = Column(String, unique=True)


class Department(Base):
    __tablename__ = 'departments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    

class Brand(Base):
    __tablename__ = 'brands'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class Provider(Base):
    __tablename__ = 'providers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    phone_number= Column(String, unique=True, nullable=True, default=None)
    email = Column(String, unique=True, nullable=True, default=None)


class Line(Base):
    __tablename__ = 'lines'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    department_id = Column(Integer, ForeignKey('departments.id'))

    department = relationship('Department')

    
class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    image = Column(String)
    cost = Column(Float)
    price = Column(Float)
    department_id = Column(Integer, ForeignKey('departments.id'))
    brand_id = Column(Integer, ForeignKey('brands.id'))
    line_id = Column(Integer, ForeignKey('lines.id'))
    provider_id = Column(Integer, ForeignKey('providers.id'))
    active = Column(Boolean, default=True)

    brand = relationship("Brand")
    department = relationship("Department")
    line = relationship("Line")
    provider = relationship("Provider")


class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    role = Column(String, CheckConstraint("role IN ('buy', 'wishlist')"), nullable=False)
    info = Column(JSON)
    total_price = Column(Float)
    time = Column(DateTime, default=datetime.datetime.now())