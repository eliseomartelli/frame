#include <Arduino.h>

#include <ESP8266WiFi.h>

#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>

#include "FastLED.h"


#define NUMLEDS 64

CRGB leds[NUMLEDS];

void setup() {
    // put your setup code here, to run once:
    delay(3000);
    FastLED.addLeds<WS2811, D4, GRB>(leds, NUMLEDS)
           .setCorrection(TypicalLEDStrip);
    FastLED.clear();
    FastLED.setBrightness(1);

    WiFiManager wifiManager;

    wifiManager.autoConnect("FrameAP");

}
int prevNum = 42;
int currNum = 42;
int subNum = 7;

void loop() {
  // put your main code here, to run repeatedly:
  leds[currNum] = CRGB::Red;
  FastLED.show();
  delay(500);
  // Now turn the LED off, then pause
  leds[prevNum] = CRGB::Black;
  FastLED.show();
  delay(500);
  prevNum = currNum;
  currNum = currNum - subNum;
}