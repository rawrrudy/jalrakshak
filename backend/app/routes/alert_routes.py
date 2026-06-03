from fastapi import APIRouter
from app.services.email_alert import send_email_alert
from app.utils.threshold_checker import check_water_safety

router = APIRouter()

@router.post("/check-water")
def check_water(ph: float, turbidity: float, temperature: float):

    status = check_water_safety(ph, turbidity, temperature)

    if status == "Unsafe":
        send_email_alert(
            "JalRakshak Warning",
            f"Unsafe water detected!\n\npH: {ph}\nTurbidity: {turbidity}",
            "rudrasundgikar@gmail.com"
        )

    return {
        "ph": ph,
        "turbidity": turbidity,
        "temperature": temperature,
        "status": status
    }

#Trial frontend run
@router.get("/sensor-data")
def get_sensor_data():

    return {
        "ph": 7.1,
        "turbidity": 15,
        "temperature": 26,
        "status": "Safe"
    }