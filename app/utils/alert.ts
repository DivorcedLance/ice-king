import { WeatherData, WeatherAlert, AlertThresholds } from "../types/weather";

const DEFAULT_THRESHOLDS: AlertThresholds = {
  temperature: { min: 15, max: 30 },
  humidity: { min: 30, max: 70 },
  pressure: { min: 980, max: 1020 },
};

export const checkAlerts = (
  data: WeatherData,
  thresholds: AlertThresholds = DEFAULT_THRESHOLDS
): WeatherAlert[] => {
  const alerts: WeatherAlert[] = [];
  const timestamp = new Date().toISOString();

  if (data.temperatura < thresholds.temperature.min) {
    alerts.push({
      type: "temperature",
      severity: "warning",
      message: `Temperature is below minimum threshold (${data.temperatura.toFixed(
        1
      )}°C)`,
      timestamp,
    });
  } else if (data.temperatura > thresholds.temperature.max) {
    alerts.push({
      type: "temperature",
      severity: "critical",
      message: `Temperature is above maximum threshold (${data.temperatura.toFixed(
        1
      )}°C)`,
      timestamp,
    });
  }

  if (data.humedad < thresholds.humidity.min) {
    alerts.push({
      type: "humidity",
      severity: "warning",
      message: `Humidity is below minimum threshold (${data.humedad.toFixed(
        1
      )}%)`,
      timestamp,
    });
  } else if (data.humedad > thresholds.humidity.max) {
    alerts.push({
      type: "humidity",
      severity: "critical",
      message: `Humidity is above maximum threshold (${data.humedad.toFixed(
        1
      )}%)`,
      timestamp,
    });
  }

  if (data.presion < thresholds.pressure.min) {
    alerts.push({
      type: "pressure",
      severity: "warning",
      message: `Pressure is below minimum threshold (${data.presion.toFixed(
        1
      )} hPa)`,
      timestamp,
    });
  } else if (data.presion > thresholds.pressure.max) {
    alerts.push({
      type: "pressure",
      severity: "critical",
      message: `Pressure is above maximum threshold (${data.presion.toFixed(
        1
      )} hPa)`,
      timestamp,
    });
  }

  return alerts;
};
