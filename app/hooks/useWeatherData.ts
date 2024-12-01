"use client";
import { useCallback, useState } from "react";
import { WeatherData } from "../types/weather";

const useWeatherData = () => {
  const [data, setData] = useState<WeatherData[]>([]);
  const [latestReport, setLatestReport] = useState<WeatherData>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchTime < 1000) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/reporte", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al consumir la API");
      }

      const result: { ultimosReportes: WeatherData[] } = await response.json();
      setData(result.ultimosReportes);
      setLatestReport(result.ultimosReportes[0] || null);
      setLastFetchTime(now);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [lastFetchTime]);

  const refreshLatest = () => {
    fetchData();
  };
  return {
    data,
    latestReport,
    error,
    isLoading,
    fetchData,
    refreshLatest,
  };
};

export default useWeatherData;
