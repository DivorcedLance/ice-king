type WeatherData = {
  id: number | null;
  temperatura: number;
  presion: number;
  altitud: number;
  humedad: number;
  distancia: number;
  created_at: string;
};

export interface WeatherStats {
  current: WeatherData;
  min: WeatherData;
  max: WeatherData;
  average: WeatherData;
}

export interface AlertThresholds {
  temperature: { min: number; max: number };
  humidity: { min: number; max: number };
  pressure: { min: number; max: number };
}

export interface WeatherAlert {
  type: "temperature" | "humidity" | "pressure";
  severity: "warning" | "critical";
  message: string;
  timestamp: string;
}
