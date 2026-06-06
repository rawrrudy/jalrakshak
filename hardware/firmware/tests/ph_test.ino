#define PH_PIN 34

void setup() {
  Serial.begin(115200);
}

void loop() {
  int adcValue = analogRead(PH_PIN);

  float voltage = adcValue * (3.3 / 4095.0);

  Serial.print("ADC: ");
  Serial.print(adcValue);

  Serial.print("  Voltage: ");
  Serial.println(voltage, 3);

  delay(1000);
}

