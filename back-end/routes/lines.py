from fastapi import APIRouter, Depends, HTTPException
from typing import List

from sqlalchemy.orm import Session
from helpers.models import Line_info, Line_db, Product_info
from db.connection import get_db
from db.schema import Line, Product, Department, Brand

lines_router = APIRouter(prefix='/lines', tags=['Lines'])

@lines_router.post('/create/', response_model=Line_db)
async def create_line(line: Line_info, db: Session = Depends(get_db)):
    '''Creates a new line'''
    department = db.query(Department).filter(Department.name == line.department).first()
    if not department:
        raise HTTPException(status_code=404, detail='Department does not exists')
    db_line = Line(
        name = line.name,
        department_id = department
    )
    db.add(db_line)
    db.commit()
    db.refresh(db_line)
    return db_line


@lines_router.get('/get_lines/', response_model=list[Line_db])
async def get_lines(db: Session = Depends(get_db)):
    '''Returns all lines'''
    return db.query(Line).all()


@lines_router.get('/products/', response_model=List[Product_info])
async def get_products_by_line(line_id: int, db: Session = Depends(get_db)):
    products_info = []
    products = db.query(Product).filter(Product.line_id == line_id).all()
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


@lines_router.get('/get_line/{line_id}', response_model=Line_db)
async def get_line_by_id(line_id: int, db: Session = Depends(get_db)):
    '''Returns a line by id'''
    return db.query(Line).filter(Line.id == line_id).first()


@lines_router.get('/get_line_by_name/{line_name}', response_model=Line_info)
async def get_line_by_name(line_name: str, db: Session = Depends(get_db)):
    '''Returns a line by name'''
    line = db.query(Line).filter(Line.name == line_name).first()
    department = db.query(Department).filter(Department.id == line.Department_id)
    return Line_info(name=line.name, department=department.name)


@lines_router.put('/update/{line_id}', response_model=Line_db)
async def update_line(line_id: int, line: Line_info, db: Session = Depends(get_db)):
    '''Updates a line by id'''
    db_line = db.query(Line).filter(Line.id == line_id).first()
    if db_line:
        db_line.name = line.name
        db.commit()
        db.refresh(db_line)
        return db_line
    raise HTTPException(status_code=404, detail="Line not found")


@lines_router.delete('/delete/{line_id}')
async def delete_line(line_id: int, db: Session = Depends(get_db)):
    '''Deletes a line by id'''
    db_line = db.query(Line).filter(Line.id == line_id).first()
    if db_line:
        db.delete(db_line)
        db.commit()
        return {"message": "Line deleted"}
    raise HTTPException(status_code=404, detail="Line not found")
