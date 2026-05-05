from database import engine, Base
from fastapi import FastAPI
import models
from routers.users import router as users_router
from routers.auth_router import router as auth_router
from routers.tasks import router as tasks_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(auth_router)
app.include_router(tasks_router)

@app.get("/")
def root():
    return {"message": "API funcionando"}