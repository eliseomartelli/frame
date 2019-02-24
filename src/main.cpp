#include <Arduino.h>

#include <ESP8266WiFi.h>

#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <WiFiManager.h>
#include <ArduinoJson.h>
#include "FastLED.h"

#include <FirebaseArduino.h>

#include "config.h"

#define NUMLEDS 64

CRGB leds[NUMLEDS];


void setup() {
    // put your setup code here, to run once:
    Serial.begin(9600);
    delay(3000);
    FastLED.addLeds<WS2811, D4, GRB>(leds, NUMLEDS)
           .setCorrection(TypicalLEDStrip);
    FastLED.setBrightness(8);

    WiFiManager wifiManager;

    wifiManager.autoConnect("FrameAP");

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.stream("frames/" + WiFi.macAddress());
    FastLED.clear();

}

void loop() {
  // put your main code here, to run repeatedly:
  if (Firebase.failed()) {
      Serial.println("Firebase get failed");
      Serial.println(Firebase.error());
      return;
  }
  if (Firebase.available()) {
      FirebaseObject event = Firebase.readEvent();
      String path = event.getString("path");
      if (path.indexOf("display") > 0) {
        String data = event.getString("data");
        DynamicJsonBuffer jsonBuffer;
        JsonArray& root = jsonBuffer.parseArray(data);
        for (int i = 0; i < NUMLEDS; i++) {
          int r = root[i][0];
          int g = root[i][1];
          int b = root[i][2];
          leds[i].r = r;
          leds[i].g = g;
          leds[i].b = b;
        }
      }
      FastLED.show();
  }
}