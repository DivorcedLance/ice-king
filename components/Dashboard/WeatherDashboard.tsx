"use client";

import React from "react";
import { WeatherCard } from "./WeatherCard";
import { StationStatus } from "./StationStatus";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";
import { WeatherData } from "@/app/types/weather";

interface Props {
  latestReport: WeatherData;
  reports: WeatherData[];
  isLoadingLatest: boolean;
  refreshLatest: () => void;
  latestError: Error | null;
}

export const WeatherDashboard: React.FC<Props> = ({
  reports,
  latestReport,
  isLoadingLatest,
  refreshLatest,
  latestError,
}: Props) => {
  if (isLoadingLatest) {
    return <LoadingState />;
  }

  if (latestError) {
    return (
      <ErrorState
        message="Error al obtener datos del clima. Por favor, inténtalo de nuevo."
        onRetry={() => {
          refreshLatest();
        }}
      />
    );
  }

  const calculateAverage = (data: number[]) => {
    return data.reduce((acc, curr) => acc + curr, 0) / data.length;
  };

  const temperatureList = reports.map((report) => report.temperatura);
  const humidityList = reports.map((report) => report.humedad);
  const pressureList = reports.map((report) => report.presion);

  return (
    <div className="space-y-6 px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherCard
          title="Lecturas actuales"
          temperature={latestReport?.temperatura}
          humidity={latestReport?.humedad}
          pressure={latestReport?.presion}
          isLoading={isLoadingLatest}
        />
        <WeatherCard
          title="Promedio de lecturas"
          humidity={calculateAverage(humidityList)}
          temperature={calculateAverage(temperatureList)}
          pressure={calculateAverage(pressureList)}
          isLoading={isLoadingLatest}
        />
        <StationStatus
          lastReading={latestReport}
          isOnline
        />
      </div>
    </div>
  );
};
