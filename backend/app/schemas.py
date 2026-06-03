from pydantic import BaseModel

class SensorDataCreate(BaseModel):
    device_id: str
    water_level: float
    ph: float
    temperature: float
    tds: float
    turbidity: float