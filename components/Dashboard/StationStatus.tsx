"use client";

import React from "react";
import { WeatherData } from "@/app/types/weather";
import { Activity, Clock } from "lucide-react";

interface StationStatusProps {
  lastReading?: WeatherData;
  isOnline: boolean;
}

export const StationStatus: React.FC<StationStatusProps> = ({
  lastReading,
  isOnline,
}) => {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-6 transform transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-600 pb-2">
        Station Status
      </h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-full transition-colors duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-700">
              <Activity className="text-purple-500 dark:text-purple-300 h-6 w-6" />
            </div>
            <span className="text-lg text-gray-600 dark:text-gray-300">
              Status
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`font-semibold text-lg ${
                isOnline
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {lastReading && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-800 rounded-full transition-colors duration-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-700">
                <Clock className="text-indigo-500 dark:text-indigo-300 h-6 w-6" />
              </div>
              <span className="text-lg text-gray-600 dark:text-gray-300">
                Last Update
              </span>
            </div>
            <span className="text-lg text-gray-800 dark:text-gray-100 font-medium">
              {new Date(lastReading.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
