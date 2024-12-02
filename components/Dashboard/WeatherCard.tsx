import React from "react";
import { Thermometer, Droplets, Gauge } from "lucide-react";

interface WeatherCardProps {
  title: string;
  temperature?: number; // Hacer opcionales los valores para soportar loading
  humidity?: number;
  pressure?: number;
  isLoading?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  temperature,
  humidity,
  pressure,
  isLoading = false,
}) => {
  const Skeleton = () => (
    <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
  );

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
              <Thermometer className="text-red-500 h-6 w-6" />
            </div>
            <span className="text-gray-600">Temperature</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            {isLoading ? <Skeleton /> : `${temperature?.toFixed(1)}°C`}
          </span>
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Droplets className="text-blue-500 h-6 w-6" />
            </div>
            <span className="text-gray-600">Humidity</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            {isLoading ? <Skeleton /> : `${humidity?.toFixed(1)}%`}
          </span>
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Gauge className="text-green-500 h-6 w-6" />
            </div>
            <span className="text-gray-600">Pressure</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            {isLoading ? <Skeleton /> : `${pressure?.toFixed(1)} hPa`}
          </span>
        </div>
      </div>
    </div>
  );
};
