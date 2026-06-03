from fastapi import FastAPI
from app.routes.sensor_routes import router as sensor_router
from app.database import engine
from app.models import Base
from app.routes.alert_routes import router as alert_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="JalRakshak API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensor_router)
app.include_router(alert_router)

@app.get("/")
def home():
    return {
        "message": "JalRakshak Backend Running Successfully"
    }