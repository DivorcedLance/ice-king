import React from "react";
import { WeatherAlert } from "@/app/types/weather";
import { AlertTriangle, AlertCircle, X } from "lucide-react";

interface AlertsListProps {
  alerts: WeatherAlert[];
}

export const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Alerts</h2>
        <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm">
          {alerts.length} alerts
        </span>
      </div>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-start space-x-4 p-6 rounded-xl transform transition-all duration-300 hover:scale-102 ${
              alert.severity === "critical"
                ? "bg-red-50 border-l-4 border-red-500"
                : "bg-yellow-50 border-l-4 border-yellow-500"
            }`}
          >
            {alert.severity === "critical" ? (
              <AlertCircle className="text-red-500 h-6 w-6 flex-shrink-0" />
            ) : (
              <AlertTriangle className="text-yellow-500 h-6 w-6 flex-shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-semibold ${
                    alert.severity === "critical"
                      ? "text-red-700"
                      : "text-yellow-700"
                  }`}
                >
                  {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}{" "}
                  Alert
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600">{alert.message}</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-gray-600 text-lg">No alerts to display</p>
            <p className="text-gray-400">All systems are operating normally</p>
          </div>
        )}
      </div>
    </div>
  );
};
