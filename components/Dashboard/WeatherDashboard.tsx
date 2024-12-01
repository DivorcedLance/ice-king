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
        message="Failed to fetch weather data. Please try again."
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {latestReport && (
          <WeatherCard
            title="Current Readings"
            temperature={latestReport.temperatura}
            humidity={latestReport.humedad}
            pressure={latestReport.presion}
          />
        )}
        <WeatherCard
          title="Average Readings"
          humidity={calculateAverage(humidityList)}
          temperature={calculateAverage(temperatureList)}
          pressure={calculateAverage(pressureList)}
        />
        <StationStatus lastReading={latestReport} isOnline />
      </div>
    </div>
  );
};
