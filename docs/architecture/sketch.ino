#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

// OLED display object
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// LED pin
const int ledPin = 2;

void setup() {

  // Start LED pin
  pinMode(ledPin, OUTPUT);

  // Start I2C communication
  Wire.begin(21, 22);

  // Start OLED
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    while(true);
  }

  // Clear OLED
  display.clearDisplay();

  // Big title text
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);

  // First line
  display.setCursor(0, 10);
  display.println("JalRakshak");

  // Smaller text
  display.setTextSize(1);

  // Second line
  display.setCursor(0, 40);
  display.println("Water Safe");

  // Show everything on screen
  display.display();
}

void loop() {

  // Blink LED ON
  digitalWrite(ledPin, HIGH);
  delay(1000);

  // Blink LED OFF
  digitalWrite(ledPin, LOW);
  delay(1000);
}