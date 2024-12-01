"use client";
import React from "react";
import useWeatherData from "../hooks/useWeatherData";
import { WeatherDashboard } from "@/components/Dashboard/WeatherDashboard";
import { WeatherChart } from "@/components/Dashboard/WeatherChart";

const Page: React.FC = () => {
  const {
    data: reports,
    error: latestError,
    isLoading: isLoadingLatest,
    refreshLatest,
  } = useWeatherData();

  if (isLoadingLatest) {
    return <div>Loading...</div>;
  }

  if (latestError) {
    return <div>Error: {latestError.message}</div>;
  }

  return (
    <div className="p-4 space-y-6 bg-gray-100 min-h-screen flex flex-col justify-center overflow-visible">
      {reports ? (
        <WeatherDashboard
          reports={reports}
          latestReport={reports[0]}
          isLoadingLatest={isLoadingLatest}
          latestError={latestError}
          refreshLatest={refreshLatest}
        />
      ) : (
        <div>No hay datos</div>
      )}
      <div className="p-4 w-full h-full">
        <WeatherChart data={reports} />
      </div>
    </div>
  );
};

export default Page;
