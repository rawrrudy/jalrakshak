#include <OneWire.h>
#include <DallasTemperature.h>

//----------------PINS---------------------
#define ONE_WIRE_BUS 4

#define PH_PIN 34
#define TDS_PIN 35
#define TURBIDITY_PIN 32

#define TRIG_PIN 5
#define ECHO_PIN 18

//----------------TEMP SENSOR----------------
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);

void setup() {
  Serial.begin(115200);

  tempSensor.begin();

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  Serial.println("JalRakshak Sensors Started");
}

void loop() {

  //===================TEMPERATURE==================
  tempSensor.requestTemperatures();
  float temperature = tempSensor.getTempCByIndex(0);

  //====================PH==========================
  int phADC = analogRead(PH_PIN);
  float phVoltage = phADC * (3.3 / 4095.0);

  // Placeholder calibration
  float pH = 7 + ((2.5 - phVoltage) / 0.18);

  //====================TDS==========================
  int tdsADC = analogRead(TDS_PIN);
  float tdsVoltage = tdsADC * (3.3 / 4095.0);

  float tds = 
      (133.42 * tdsVoltage * tdsVoltage * tdsVoltage
      -255.86 * tdsVoltage * tdsVoltage
      +857.39 * tdsVoltage) * 0.5;

  // ==================TURBIDITY=====================
  int turbidityADC = analogRead(TURBIDITY_PIN);
  float turbidityVoltage = turbidityADC * (3.3 / 4095.0);

  float ntu =
      -1120.4 * turbidityVoltage * turbidityVoltage
      +5742.3 * turbidityVoltage
      -4352.9;

  if (ntu < 0) ntu = 0;

  // ==================ULTRASONIC====================
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);

  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);

  float distance =
      duration * 0.0343 / 2.0;

  // ===================OUTPUT========================
  Serial.println("================================");

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" C");

  Serial.print("pH: ");
  Serial.println(pH, 2);

  Serial.print("TDS: ");
  Serial.print(tds);
  Serial.println(" ppm");

  Serial.print("Turbidity: ");
  Serial.print(ntu);
  Serial.println(" ppm");

  Serial.print("Water Level Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  Serial.println("================================");
  Serial.println();

  delay(2000);
}
