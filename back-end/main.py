#################### fastapi modules ####################
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

#################### Routers ####################
from routers.auth import auth_router
from routers.lines import lines_router
from routers.users import users_router
from routers.products import products_router
from routers.brands import brands_router
from routers.departments import departments_router
from routers.providers import providers_router
from routers.transactions import transactions_router

#################### db modules ####################
from db.connection import create_db_and_tables, get_db
from db.populate_db import populate

#################### others ####################
import json
from types import SimpleNamespace


with open('config/backend.json') as tmp:
    config = SimpleNamespace(**json.load(tmp))


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    db = next(get_db())
    populate(db)
    yield


# tags_metadata = [
#     {
#         'name':'Lines',
#         'description': 'Crud operations for the lines table'
#     }
# ]


app = FastAPI(
    title=config.title,
    version=config.version,
    description=config.description,
    contact={
        "name": "Jesús Soto",
        "url": "https://github.com/Jsotomolinez",
        "email": "jsotomolinez12@gmial.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    lifespan=lifespan,
    # openapi_tags=tags_metadata,
    )
app.include_router(auth_router)
app.include_router(lines_router)
app.include_router(users_router)
app.include_router(products_router)
app.include_router(brands_router)
app.include_router(departments_router)
app.include_router(providers_router)
app.include_router(transactions_router)



origins = config.origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)