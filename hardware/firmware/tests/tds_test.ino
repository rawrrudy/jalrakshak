#define TDS_PIN 35

void setup() {
  Serial.begin(115200);
}

void loop() {
  int adcValue = analogRead(TDS_PIN);

  float voltage = adcValue * (3.3 / 4095.0);

  float tdsValue = 
      (133.42 * voltage * voltage * voltage
      -255.86 * voltage * voltage
      +857.39 * voltage) * 0.5;

  Serial.print("Voltage: ");
  Serial.print(voltage, 2);

  Serial.print(" V  TDS: ");
  Serial.print(tdsValue);
  Serial.println(" ppm");

  delay(1000);
}
