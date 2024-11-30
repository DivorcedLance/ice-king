template<class T> inline Print &operator <<(Print &obj, T arg) {
  obj.print(arg);
  return obj;
}
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#define EEPROM_SIZE 12
#include <driver/ledc.h>
#include "CTBot.h"
#include "Utilities.h"
#include <EEPROM.h>
#include <WiFi.h>
#include <ThingSpeak.h>
#include <driver/ledc.h>
#include <HTTPClient.h>

CTBot miBot;
CTBotInlineKeyboard miTeclado;

Adafruit_BME280 bme;
#define SEALEVELPRESSURE_HPA (1013.25)


const char* ssid = "nombre_De_wifi";
const char* password = "clave_De_wifi";
const String token = "6760974551:AAFkFz0xHJQoe_hfij1peG7IzokqDyLiEqg";
int64_t IDchats[] = {6742384195};
int numIDchats = sizeof(IDchats) / sizeof(IDchats[0]);
const String nombre = "NEPTOR_bot Activado.";

int Led = 2;
int PIR = 14;
int UltrasonicTrigger = 13;
int UltrasonicEcho = 12;
int distancia = 0;
float tiempo = 0;
float espera = 60;


const int DireccionEstacion = 0;
boolean Estacion = true;
const int DireccionActivo = 1;
boolean Activo = true;

// ThingSpeak configuration
char thingSpeakAddress[] = "api.thingspeak.com";
unsigned long channelID = 2341025; 
const char* writeAPIKey = "18DGITXF2JLL7F62"; 

int movimientoContador = 0;

WiFiClient client;

void setup() {
  Serial.begin(115200);
  Serial.println();
  Serial.println("Iniciando NEPTOR_bot de Telegram.");
  
  EEPROM.begin(EEPROM_SIZE);
  Serial.println("EEPROM Configurada (Datos de memoria restaurados.)");

  Activo = EEPROM.read(DireccionActivo);
  Serial.print("Sensor: ");
  Serial.println(Activo ? "Activada" : "Desactivada");

  Estacion = EEPROM.read(DireccionEstacion);
  Serial.print("Estacion Meteorológica: ");
  Serial.println(Estacion ? "Activada" : "Desactivada");

  unsigned status;
  status = bme.begin(0x76); 
  pinMode(Led, OUTPUT);
  pinMode(PIR, INPUT_PULLUP);
  
  ledcSetup(0, 5000, 10); 
  ledcAttachPin(Led, 0);
  
  miBot.wifiConnect(ssid, password);

  miBot.setTelegramToken(token);

  if (miBot.testConnection()) {
    Serial.println("\n NEPTOR_bot conectado a la red Wi-Fi.");
  }
  else {
    Serial.println("\n NEPTOR_bot no pudo conectarse, solicitando reinicio manual.");
  }
  miTeclado.addButton("Sensor", "sensor", CTBotKeyboardButtonQuery);
  miTeclado.addButton("Estacion", "estacion", CTBotKeyboardButtonQuery);
  miTeclado.addButton("Estado", "estado", CTBotKeyboardButtonQuery);
  miTeclado.addRow();
  miTeclado.addButton("Medir", "medir", CTBotKeyboardButtonQuery);
  miTeclado.addButton("Documentación", "https://drive.google.com/file/d/1acpjMuN-O_OOl6RtM9W61JGkAcitEZ6j/view?usp=sharing", CTBotKeyboardButtonURL);

  for (int64_t chatID : IDchats) {
    miBot.sendMessage(chatID, "En Línea, Estación Meteorológica: " + nombre);
  }
  tiempo = -espera * 1000;

 // Inicializar ThingSpeak
  ThingSpeak.begin(client);
}

void loop() {
  EstacionMeteorologica();
  SistemaConfiguracion();
}

void SistemaConfiguracion() {
  TBMessage msg;

  if (miBot.getNewMessage(msg)) {
    // Itera sobre los ID de chat
    for (int i = 0; i < numIDchats; i++) {
      if (msg.sender.id == IDchats[i]) {
        if (msg.messageType == CTBotMessageText) {
          if (msg.text.equalsIgnoreCase("opciones")) {
            PedirEstado();
          }
          else {
            Serial.println("Enviar 'opciones'");
            miBot.sendMessage(msg.sender.id, "prueba 'opciones'");
          }
        } else if (msg.messageType == CTBotMessageQuery) {
          Serial << "Mensaje: " << msg.sender.firstName << "\n";
          if (msg.callbackQueryData.equals("sensor")) {
            Activo = !Activo;
            String Mensaje = "Sensor: ";
            Mensaje += (Activo ? "Activo" : "Apagado");
            Serial.println(Mensaje);
            miBot.endQuery(msg.callbackQueryID, Mensaje);
            EEPROM.put(DireccionActivo, Activo);
            EEPROM.commit();
          } else if (msg.callbackQueryData.equals("estacion")) {
            Estacion = !Estacion;
            String Mensaje = "Estacion: ";
            Mensaje += (Estacion ? "Activo" : "Apagado");
            Serial.println(Mensaje);
            miBot.endQuery(msg.callbackQueryID, Mensaje);
            EEPROM.put(DireccionEstacion, Estacion);
            EEPROM.commit();
          } else if (msg.callbackQueryData.equals("estado")) {
            PedirEstado();
          }else if (msg.callbackQueryData.equals("medir")) {
            MedirBME280();
          }
        }
      }
    }
  } 
}

void PedirEstado() {
  Serial.println("Enviando 'opciones'");
  String Mensaje = "Estado Actual\n";
  Mensaje += "Sensor: ";
  Mensaje += (Activo ? "Activo" : "Apagado");
  Mensaje += " - Estacion: ";
  Mensaje += (Estacion ? "Activo" : "Apagado");
  Serial.println(Mensaje);
  // Envía mensajes a cada ID de chat
  for (int i = 0; i < numIDchats; i++) {
    miBot.sendMessage(IDchats[i], Mensaje);
    miBot.sendMessage(IDchats[i], "Cambiar", miTeclado);
  }
}

void EstacionMeteorologica() {
  if (Activo) {
    int pirValue = digitalRead(PIR);
    long distancia = 0.01723 * readUltrasonicDistance
    (UltrasonicTrigger, UltrasonicEcho);
    if (pirValue == HIGH || (distancia <= 20 and distancia > 0)) {
      if (distancia <= 20 and distancia > 0) {
        Serial.println("Movimiento detectado por el sensor PIR.");
        Serial.println("Objeto detectado por el sensor ultrasónico.");
        Serial.print("Distancia: ");
        Serial.println(distancia);
        if (Estacion)
          {
          ThingSpeak.setField(1, distancia);
          MedirBME280();
        }
      } else {
        digitalWrite(Led, LOW);}
    } else {
      digitalWrite(Led, LOW);
      Serial.println("Sin movimiento");
      delay(3000);}
    }
}

long readUltrasonicDistance(int UltrasonicTrigger, 
                            int UltrasonicEcho) {
  pinMode(UltrasonicTrigger, OUTPUT);
  digitalWrite(UltrasonicTrigger, LOW);
  delayMicroseconds(2);
  digitalWrite(UltrasonicTrigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(UltrasonicTrigger, LOW);
  pinMode(UltrasonicEcho, INPUT);
  return pulseIn(UltrasonicEcho, HIGH);
}

void enviarDatosAPI(float temperatura, float presion, float altitud, float humedad, long distancia) {
  // Definir la URL del endpoint al que se enviarán los datos
  String url = "http://tu-api.com/endpoint"; // Cambia esta URL a la de tu API
  
  // Crear un objeto HTTPClient
  HTTPClient http;
  
  // Establecer la URL para la solicitud POST
  http.begin(url);
  
  // Establecer el tipo de contenido (por ejemplo, JSON)
  http.addHeader("Content-Type", "application/json");
  
  // Crear el cuerpo de la solicitud en formato JSON
  String jsonBody = "{";
  jsonBody += "\"temperatura\": " + String(temperatura) + ",";
  jsonBody += "\"presion\": " + String(presion) + ",";
  jsonBody += "\"altitud\": " + String(altitud) + ",";
  jsonBody += "\"humedad\": " + String(humedad) + ",";
  jsonBody += "\"distancia\": " + String(distancia);
  jsonBody += "}";

  // Realizar la solicitud POST
  int httpResponseCode = http.POST(jsonBody);
  
  // Verificar la respuesta del servidor
  if (httpResponseCode > 0) {
    // Si la solicitud es exitosa (código 200), mostramos el código de respuesta
    Serial.println("Datos enviados exitosamente.");
    Serial.println("Código de respuesta: " + String(httpResponseCode));
  } else {
    // Si la solicitud falla, mostramos un mensaje de error
    Serial.println("Error al enviar los datos. Código de error: " + String(httpResponseCode));
  }

  // Cerrar la conexión HTTP
  http.end();
}


void MedirBME280(){
  if (Estacion)
  {
  Serial.print("Temperatura = ");
  Serial.print(bme.readTemperature());
  Serial.println(" °C");
  Serial.print("Presión = ");
  Serial.print(bme.readPressure() / 100.0F);
  Serial.println(" hPa");
  Serial.print("Altitud Aproximada = ");
  Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
  Serial.println(" m");
  Serial.print("Humedad = ");
  Serial.print(bme.readHumidity());
  Serial.println(" %");
  Serial.println();
  digitalWrite(Led, HIGH);
  movimientoContador++;
  ThingSpeak.setField(2, movimientoContador);
  ThingSpeak.setField(3, bme.readTemperature());
  ThingSpeak.setField(4, bme.readPressure());
  ThingSpeak.setField(5, bme.readAltitude(SEALEVELPRESSURE_HPA));
  ThingSpeak.setField(6, bme.readHumidity());
  int x = ThingSpeak.writeFields(channelID, writeAPIKey);
  if(x == 200){
  Serial.println("Datos ingresados de manera exitosa.");
  }else{
  Serial.println("Datos no ingresados.");}
  Serial.println("-------------");


  // Enviar los datos a la API externa
  long distancia = 0.01723 * readUltrasonicDistance(UltrasonicTrigger, UltrasonicEcho); // Calcula la distancia
  enviarDatosAPI(temperatura, presion, altitud, humedad, distancia); // Enviar datos a la API


  digitalWrite(Led, LOW);
  delay(3000);
  }
}
