# JalRakshak Risk and Failure Analysis

I have created this document to identify any potential failure that may occur during the deployment of JalRakshak. Alongside this, I have also added mitigation techniques to improve system reliability and safety.

The objective is to ensure continous monitoring of water bodies while minimizing the downtime, inaccurate readings, and potential hardware failures.

## Failure Mode Assessment

| Failure Mode | Cause | Impact | Severity | Mitigation Strategy |
|--------------|-------|--------|----------|---------------------|
| pH Sensor Drift | Long term use and contamination | Incorrect pH readings | Medium | Periodic calibration and maintenance |
| TDS Sensor Fouling | Mineral buildup on probe | Inaccurate water quality measurements | Medium | Regular cleaning schedule |
| Turbidity Sensor Obstruction | Mud, algae, or debris accumulation | False turbidity readings | Medium | Protective housing and periodic inspection |
| Ultrasonic Sensor Obstruction | Waves or uneven water surface | Incorrect water level readings | Low | Multiple readings and averaging algorithm |
| ESP32 Failure | Hardware malfunction or overheating | Complete system outage | Very High | Modular design allowing rapid replacement |
| Battery Depletion | Long term operation without charging | Device shutdown | High | Battery monitoring and low power alerts |
| WiFi Connectivity Loss | Weak signal or network outage | Data upload interruption | Medium | Local data buffering and automatic reconnection |
| PCB Water Ingress | Enclosure Leakage | Short circuit and hardware damage | High | Waterproof enclosure and sealing gaskets |
| Corrosion of Components | Continous exposure to moisture | Reduced hardware lifespan | Medium | Corrosion resistant materials and coatings |
| Backend Server Downtime | Hosting or infrastructure issues | Dashboard unavailable | Medium | Cloud deployment and periodic backups |

## Reliability  Measures Implemented

The following reliability measures have already been incorporated into JalRakshak!

- Automatic email alerts for unsafe water conditions
- Battery level monitoring
- Modular PCB architecture
- Cloud based backend for centralised monitoring
- Continous sensor data collection
- Status classification into Safe, Warning and Danger

