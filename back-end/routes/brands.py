from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session
from helpers.models import Brand_info, Brand_db, Product_info
from db.connection import get_db
from db.schema import Brand, Product, Line, Department, Brand
from typing import List

brands_router = APIRouter(prefix='/brands', tags=['brands'])

@brands_router.post('/create/', response_model=Brand_db)
async def create_brand(brand: Brand_info, db: Session = Depends(get_db)):
    '''Creates a new brand'''
    db_brand = Brand(
        name = brand.name
    )
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand


@brands_router.get('/get_brands/', response_model=list[Brand_db])
async def get_brands(db: Session = Depends(get_db)):
    '''Returns all brands'''
    return db.query(Brand).all()


@brands_router.get('/products/', response_model=List[Product_info])
async def get_products_by_brand(brand_id: int, db: Session = Depends(get_db)):
    products_info = []
    products = db.query(Product).filter(Product.brand_id == brand_id).all()
    for product in products:
        department_name = db.query(Department).filter(Department.id == product.department_id).first()
        brand_name = db.query(Brand).filter(Brand.id == product.brand_id).first()
        line_name = db.query(Line).filter(Line.id == product.line_id).first()
        products_info.append(Product_info(
            name=product.name,
            description=product.description,
            image=product.image,
            cost=product.cost,
            price=product.price,
            department=department_name,
            brand=brand_name,
            line=line_name
        ))
    return products_info


@brands_router.get('/by_id/{brand_id}', response_model=Brand_db)
async def get_brand_by_id(brand_id: int, db: Session = Depends(get_db)):
    '''Returns a brand by id'''
    return db.query(Brand).filter(Brand.id == brand_id).first()


@brands_router.get('/by_name/{brand_name}', response_model=Brand_db)
async def get_brand_by_name(brand_name: str, db: Session = Depends(get_db)):
    '''Returns a brand by name'''
    return db.query(Brand).filter(Brand.name == brand_name).first()


@brands_router.put('/update/{brand_id}', response_model=Brand_db)
async def update_brand(brand_id: int, brand: Brand_info, db: Session = Depends(get_db)):
    '''Updates a brand by id'''
    db_brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if db_brand:
        db_brand.name = brand.name
        db.commit()
        db.refresh(db_brand)
        return db_brand
    raise HTTPException(status_code=404, detail="Brand not found")


@brands_router.delete('/delete/{brand_id}')
async def delete_brand(brand_id: int, db: Session = Depends(get_db)):
    '''Deletes a brand by id'''
    db_brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if db_brand:
        db.delete(db_brand)
        db.commit()
        return {"message": "Brand deleted"}
    raise HTTPException(status_code=404, detail="Brand not found")