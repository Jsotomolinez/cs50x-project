
from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session
from helpers.models import Provider_info, Provider_db
from db.connection import get_db
from db.schema import Provider

providers_router = APIRouter(prefix='/providers', tags=['providers'])

@providers_router.post('/create/', response_model=Provider_db)
async def create_brand(provider: Provider_info, db: Session = Depends(get_db)):
    '''Creates a new provider'''
    db_provider = Provider(
        name = provider.name,
        phone_number = provider.phone_number,
        email = provider.email,
    )
    db.add(db_provider)
    db.commit()
    db.refresh(db_provider)
    return db_provider


@providers_router.get('/get_providers/', response_model=list[Provider_db])
async def get_providers(db: Session = Depends(get_db)):
    '''Returns all brands'''
    return db.query(Provider).all()


@providers_router.get('/by_id/{provider_id}', response_model=Provider_db)
async def get_provider_by_id(provider_id: int, db: Session = Depends(get_db)):
    '''Returns a provider by id'''
    return db.query(Provider).filter(Provider.id == provider_id).first()


@providers_router.get('/by_name/{provider_name}', response_model=Provider_db)
async def get_provider_by_name(provider_name: str, db: Session = Depends(get_db)):
    '''Returns a provider by name'''
    return db.query(Provider).filter(Provider.name == provider_name).first()


@providers_router.put('/update/{provider_id}', response_model=Provider_db)
async def update_provider(provider_id: int, provider: Provider_info, db: Session = Depends(get_db)):
    '''Updates a provider by id'''
    db_provider = db.query(Provider).filter(Provider.id == provider_id).first()
    if db_provider:
        db_provider.name = provider.name
        db_provider.active = provider.active
        db.commit()
        db.refresh(db_provider)
        return db_provider
    raise HTTPException(status_code=404, detail="Provider not found")


@providers_router.put('/activate/{provider_id}', response_model=Provider_db)
async def activate_provider(provider_id: int, db: Session = Depends(get_db)):
    '''Activates a provider by id'''
    db_provider = db.query(Provider).filter(Provider.id == provider_id).first()
    if db_provider:
        db_provider.active = True
        db.commit()
        db.refresh(db_provider)
        return db_provider
    raise HTTPException(status_code=404, detail="Provider not found")


@providers_router.put('/deactivate/{provider_id}', response_model=Provider_db)
async def deactivate_provider(provider_id: int, db: Session = Depends(get_db)):
    '''Deactivates a provider by id'''
    db_provider = db.query(Provider).filter(Provider.id == provider_id).first()
    if db_provider:
        db_provider.active = False
        db.commit()
        db.refresh(db_provider)
        return db_provider
    raise HTTPException(status_code=404, detail="Provider not found")


@providers_router.delete('/delete/{provider_id}')
async def delete_provider(provider_id: int, db: Session = Depends(get_db)):
    '''Deletes a provider by id'''
    db_provider = db.query(Provider).filter(Provider.id == provider_id).first()
    if db_provider:
        db.delete(db_provider)
        db.commit()
        return {"message": "Brand deleted"}
    raise HTTPException(status_code=404, detail="Brand not found")