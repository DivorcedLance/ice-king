import React from "react";
import { Thermometer, Droplets, ArrowUp, Gauge, Loader2 } from "lucide-react";

export default function WeatherLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center animate-pulse">
            <Thermometer size={32} />
          </div>
          <p className="mt-2 text-sm text-gray-700">Cargando Temperatura</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center animate-pulse">
            <Droplets size={32} />
          </div>
          <p className="mt-2 text-sm text-gray-700">Cargando Humedad</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center animate-pulse">
            <Gauge size={32} />
          </div>
          <p className="mt-2 text-sm text-gray-700">Cargando Presión</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-yellow-400 text-gray-800 rounded-full w-16 h-16 flex items-center justify-center animate-pulse">
            <ArrowUp size={32} />
          </div>
          <p className="mt-2 text-sm text-gray-700">Cargando Altitud</p>
        </div>
      </div>
      <div className="mt-8 flex items-center gap-2 text-blue-600">
        <Loader2 className="animate-spin" size={32} />
        <span className="text-lg font-semibold">Cargando Reportes...</span>
      </div>
    </div>
  );
}
