"use client";
import { useCallback, useEffect, useState } from "react";
import { WeatherData } from "@/app/types/weather";

const useWeatherData = () => {
  const [data, setData] = useState<WeatherData[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

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

      const result = await response.json();
      setData(result.reports);

      setLastFetchTime(now);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [lastFetchTime]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshLatest = () => {
    fetchData();
  };
  return {
    data,
    error,
    isLoading,
    fetchData,
    refreshLatest,
  };
};

export default useWeatherData;
