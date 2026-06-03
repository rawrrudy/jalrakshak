from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import SensorData
from app.schemas import SensorDataCreate

from app.utils.threshold_checker import check_water_safety
from app.services.email_alert import send_email_alert

from app.services.alert_cooldown import can_send_alert

router = APIRouter()

# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST sensor data
@router.post("/sensor-data")
def create_sensor_data(
    data: SensorDataCreate,
    db: Session = Depends(get_db)
):
    new_data = SensorData(
        device_id=data.device_id,
        water_level=data.water_level,
        ph=data.ph,
        temperature=data.temperature,
        tds=data.tds,
        turbidity=data.turbidity
    )

    db.add(new_data)
    db.commit()
    db.refresh(new_data)

    status = check_water_safety(
        new_data.ph,
        new_data.turbidity,
        new_data.temperature,
        new_data.tds,
        new_data.water_level
    )

    if status == "Danger" and can_send_alert(new_data.device_id):
        send_email_alert(
            subject="JalRakshak Flood Alert",
            message=f"""
    FLOOD RISK DETECTED

    Device ID: {new_data.device_id}

    Water Level: {new_data.water_level}

    The water level has exceeded the safe threshold.
    Immediate inspection is recommended.
    """,
            receiver_email="rudrasundgikar@gmail.com"
        )

    elif status in ["Warning", "Unsafe"] and can_send_alert(new_data.device_id):
        send_email_alert(
            subject=f"JalRakshak {status} Alert",
            message=f"""
    Device ID: {new_data.device_id}

    Status: {status}

    Water Level: {new_data.water_level}
    pH: {new_data.ph}
    Temperature: {new_data.temperature}
    TDS: {new_data.tds}
    Turbidity: {new_data.turbidity}
    """,
            receiver_email="rudrasundgikar@gmail.com"
        )

    return {
        "message": "Sensor data stored successfully",
        "status": status,
        "data": {
            "id": new_data.id,
            "device_id": new_data.device_id,
            "water_level": new_data.water_level,
            "ph": new_data.ph,
            "temperature": new_data.temperature,
            "tds": new_data.tds,
            "turbidity": new_data.turbidity
        }
    }

# Get all sensor data
@router.get("/sensor-data")
def get_sensor_data(db: Session = Depends(get_db)):
    data = db.query(SensorData).all()
    return data
