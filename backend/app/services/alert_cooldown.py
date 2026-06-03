from datetime import datetime, timedelta

last_alert_time = {}

COOLDOWN_MINUTES = 30

def can_send_alert(device_id):
    now = datetime.now()

    if device_id not in last_alert_time:
        last_alert_time[device_id] = now
        return True
    
    elapsed = now - last_alert_time[device_id]

    if elapsed > timedelta(minutes=COOLDOWN_MINUTES):
        last_alert_time[device_id] = now
        return True
    
    return False