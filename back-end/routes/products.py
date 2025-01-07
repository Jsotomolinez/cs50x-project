from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session
from helpers.models import Product_info, Product_db, Product_create
from db.connection import get_db
from db.schema import Product, Line, Brand, Department
# from typing import List

products_router = APIRouter(prefix='/products', tags=["Products"])


@products_router.get("/", response_model=list[Product_info])
async def get_products(db: Session = Depends(get_db)):
    '''Get all products'''
    products = db.query(Product).all()
    products_info = []
    for product in products:
        department = db.query(Department).filter(Department.id == product.department_id).first()
        if department is None:
            raise HTTPException(status_code=404, detail="Product's department not found")
        brand = db.query(Brand).filter(Brand.id == product.brand_id).first()
        if brand is None:
            raise HTTPException(status_code=404, detail="Product's brand not found")
        line = db.query(Line).filter(Line.id == product.line_id).first()
        if line is None:
            raise HTTPException(status_code=404, detail="Product's line not found")
        products_info.append(Product_info(
            id=product.id,
            name=product.name,
            description=product.description,
            image=product.image,
            price=product.price,
            department=department.name,
            brand=brand.name,
            line=line.name
        ))
    return products_info


@products_router.get("/get_by_id/{product_id}", response_model=Product_info)
async def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    '''Changes dpt, brand and line from id to name'''
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    department = db.query(Department).filter(Department.id == product.department_id).first()
    if department is None:
        raise HTTPException(status_code=404, detail="Product's department not found")
    brand = db.query(Brand).filter(Brand.id == product.brand_id).first()
    if brand is None:
        raise HTTPException(status_code=404, detail="Product's brand not found")
    line = db.query(Line).filter(Line.id == product.line_id).first()
    if line is None:
        raise HTTPException(status_code=404, detail="Product's line not found")
    product_info = Product_info(
        id=product.id,
        name=product.name,
        description=product.description,
        image=product.image,
        price=product.price,
        department=department.name,
        brand=brand.name,
        line=line.name
    )
    return product_info


@products_router.get("/get_by_name/{product_name}/", response_model=Product_info)
async def get_product_by_name(product_name: str, db: Session = Depends(get_db)):
    '''Changes dpt, brand and line from id to name'''
    product = db.query(Product).filter(Product.name == product_name).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    department = db.query(Department).filter(Department.id == product.department_id).first()
    if department is None:
        raise HTTPException(status_code=404, detail="Product's department not found")
    brand = db.query(Brand).filter(Brand.id == product.brand_id).first()
    if brand is None:
        raise HTTPException(status_code=404, detail="Product's brand not found")
    line = db.query(Line).filter(Line.id == product.line_id).first()
    if line is None:
        raise HTTPException(status_code=404, detail="Product's line not found")
    product_info = Product_info(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        department=department.name,
        brand=brand.name,
        line=line.name
    )
    return product_info


@products_router.post("/create/", response_model=Product_db)
async def create_product(product: Product_create, db: Session = Depends(get_db)):
    '''Create a new product'''
    new_product = Product(
        name=product.name,
        description=product.description,
        image=product.image,
        cost=product.cost,
        price=product.price,
        department_id=product.department_id,
        brand_id=product.brand_id,
        line_id=product.line_id,
        provider_id=product.provider_id
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


@products_router.put("/update/{product_id}/", response_model=Product_db)
async def update_product(product_id: int, product: Product_create, db: Session = Depends(get_db)):
    '''Update a product'''
    product_db = db.query(Product).filter(Product.id == product_id).first()
    if product_db is None:
        raise HTTPException(status_code=404, detail="Product not found")
    product_db.name = product.name
    product_db.description = product.description
    product_db.image = product.image
    product_db.cost = product.cost
    product_db.price = product.price
    product_db.department_id = product.department_id
    product_db.brand_id = product.brand_id
    product_db.line_id = product.line_id
    product_db.provider_id = product.provider_id
    db.commit()
    db.refresh(product_db)
    return product_db

@products_router.put("/activate/{product_id}/", response_model=Product_db)
async def activate_product(product_id: int, db: Session = Depends(get_db)):
    '''Activate a product'''
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    product.active = True
    db.commit()
    db.refresh(product)
    return product

@products_router.put("/deactivate/{product_id}/", response_model=Product_db)
async def deactivate_product(product_id: int, db: Session = Depends(get_db)):
    '''Deactivate a product'''
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    product.active = False
    db.commit()
    db.refresh(product)
    return product


@products_router.delete("/delete/{product_id}/")
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    '''Delete a product'''
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}