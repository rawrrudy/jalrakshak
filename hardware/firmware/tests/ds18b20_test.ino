#include <OneWire.h>
#include <DallasTemperature.h>

// DS18B20 connected to GPIO25
#define TEMP_SENSOR_PIN 25

OneWire oneWire(TEMP_SENSOR_PIN);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(115200);

  Serial.println();
  Serial.println("================================");
  Serial.println("JalRakshak DS18B20 Sensor Test");
  Serial.println("================================");

  sensors.begin();

  Serial.print("Detected sensors: ");
  Serial.println(sensors.getDeviceCount());

  if (sensors.getDeviceCount() == 0) {
    Serial.println("WARNING: No DS18B20 sensor detected!");
  }
}

void loop() {
  sensors.requestTemperatures();

  float temperatureC = sensors.getTempCByIndex(0);

  if (temperatureC == DEVICE_DISCONNECTED_C) {
    Serial.println("Error: DS18B20 disconnected!");
  } else {
    Serial.print("Temperature: ");
    Serial.print(temperatureC);
    Serial.println(" °C");
  }

  delay(2000);
}
