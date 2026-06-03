from app.core.config import (
    PH_MIN,
    PH_MAX,
    TURBIDITY_LIMIT,
    TEMPERATURE_LIMIT,
    TDS_LIMIT,
    WATER_LEVEL_LIMIT
)

def check_water_safety(ph, turbidity, temperature, tds, water_level):

    if turbidity > TURBIDITY_LIMIT:
        return "Unsafe"
    
    if temperature > TEMPERATURE_LIMIT:
        return "Warning"
    
    if ph < PH_MIN or ph > PH_MAX:
        return "Unsafe"
    
    if tds > TDS_LIMIT:
        return "Unsafe"
    
    if water_level > WATER_LEVEL_LIMIT:
        return "Danger"
    
    return "Safe"