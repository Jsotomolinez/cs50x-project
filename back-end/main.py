from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from db.connection import create_db_and_tables, get_db
from routes.lines import lines_router
from routes.users import users_router
# from routes.products import products_router
from routes.brands import brands_router
from routes.departments import departments_router
from routes.providers import providers_router
from routes.transactions import transactions_router

from db.populate_db import populate


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    db = next(get_db())
    populate(db)
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(lines_router)
app.include_router(users_router)
# app.include_router(prodsucts_router)
app.include_router(brands_router)
app.include_router(departments_router)
app.include_router(providers_router)
app.include_router(transactions_router)



origins = [
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


