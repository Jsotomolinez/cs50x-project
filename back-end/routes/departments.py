from fastapi import APIRouter, Depends, HTTPException
from typing import List

from sqlalchemy.orm import Session
from helpers.models import Department_info, Department_db, Product_info
from db.connection import get_db
from db.schema import Department, Line, Department, Brand, Product

departments_router = APIRouter(prefix='/departments', tags=['departments'])

@departments_router.post('/create/', response_model=Department_db)
async def create_department(brand: Department_info, db: Session = Depends(get_db)):
    '''Creates a new department'''
    db_department = Department(
        name = brand.name
    )
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department


@departments_router.get('/get_departments/', response_model=list[Department_db])
async def get_departments(db: Session = Depends(get_db)):
    '''Returns all brands'''
    return db.query(Department).all()


@departments_router.get('/products/', response_model=List[Product_info])
async def get_products_by_department(id: int, db: Session = Depends(get_db)):
    products_info = []
    products = db.query(Product).filter(Product.department_id == id).all()
    for product in products:
        department = db.query(Department).filter(Department.id == product.department_id).first()
        if not department:
            raise HTTPException(status_code=404, detail='Department not found')
        brand = db.query(Brand).filter(Brand.id == product.brand_id).first()
        if not brand:
            raise HTTPException(status_code=404, detail='Brand not found')
        line = db.query(Line).filter(Line.id == product.line_id).first()
        if not line:
            raise HTTPException(status_code=404, detail='Line not found')
        products_info.append(Product_info(
            id=product.id,
            name=product.name,
            description=product.description,
            image=product.image,
            cost=product.cost,
            price=product.price,
            department=department.name,
            brand=brand.name,
            line=line.name
        ))
    return products_info


@departments_router.get('/by_id/{department_id}', response_model=Department_db)
async def get_department_by_id(department_id: int, db: Session = Depends(get_db)):
    '''Returns a department by id'''
    return db.query(Department).filter(Department.id == department_id).first()


@departments_router.get('/by_name/{department_name}', response_model=Department_db)
async def get_department_by_name(department_name: str, db: Session = Depends(get_db)):
    '''Returns a department by name'''
    return db.query(Department).filter(Department.name == department_name).first()


@departments_router.put('/update/{department_id}', response_model=Department_db)
async def update_department(department_id: int, department: Department_info, db: Session = Depends(get_db)):
    '''Updates a department by id'''
    db_department = db.query(Department).filter(Department.id == department_id).first()
    if db_department:
        db_department.name = department.name
        db.commit()
        db.refresh(db_department)
        return db_department
    raise HTTPException(status_code=404, detail="Department not found")


@departments_router.delete('/delete/{department_id}')
async def delete_department(department_id: int, db: Session = Depends(get_db)):
    '''Deletes a department by id'''
    db_department = db.query(Department).filter(Department.id == department_id).first()
    if db_department:
        db.delete(db_department)
        db.commit()
        return {"message": "Department deleted"}
    raise HTTPException(status_code=404, detail="Department not found")