#define TURBIDITY_PIN 32

void setup() {
  Serial.begin(115200);
}

void loop() {

  int adcValue = analogRead(TURBIDITY_PIN);

  float voltage = adcValue * (3.3 / 4095.0);

  Serial.print("ADC: ");
  Serial.print(adcValue);

  Serial.print(" Voltage: ");
  Serial.println(voltage);

  delay(1000);
}
