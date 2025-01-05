from typing import List
from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session
from helpers.models import Transaction_db, Transaction_create
from db.connection import get_db
from db.schema import Transaction

transactions_router = APIRouter(prefix='/transactions', tags=['transactions'])


@transactions_router.post('/create/', response_model=Transaction_db)
async def create_transaction(transaction: Transaction_create, db: Session = Depends(get_db)):
    db_transaction = Transaction_create(
        user_id=transaction.user_id,
        product_id=transaction.product_id,
        quantantity=transaction.quantantity,
        total_price=transaction.total_price,
        time=transaction.time
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@transactions_router.get('/get/{transaction_id}', response_model=Transaction_db)
async def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail='Transaction not found')
    return transaction


@transactions_router.get('/get_all/', response_model=List[Transaction_db])
async def get_all_transactions(db: Session = Depends(get_db)):
    transactions = db.query(Transaction).all()
    return transactions
