import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface WeatherData {
  id: number | null;
  temperatura: number;
  presion: number;
  altitud: number;
  humedad: number;
  distancia: number;
  created_at: string;
}

interface WeatherChartProps {
  data: WeatherData[];
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    time: new Date(item.created_at).toLocaleTimeString("es-AR", {
      hour: "numeric",
      minute: "numeric",
    }),
  }));

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl shadow-lg p-8 h-[500px] mx-auto max-w-[1200px]">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Weather Trends
      </h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 50, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: "#4b5563" }}
            tickMargin={10}
            axisLine={{ stroke: "#9ca3af" }}
            label={{
              value: "Time",
              position: "insideBottomRight",
              offset: -10,
              fill: "#4b5563",
            }}
          />
          <YAxis
            yAxisId="temp"
            domain={["auto", "auto"]}
            tick={{ fontSize: 12, fill: "#ef4444" }}
            tickMargin={10}
            axisLine={{ stroke: "#ef4444" }}
            label={{
              value: "Temperature (°C)",
              angle: -90,
              position: "insideLeft",
              fill: "#ef4444",
              offset: 0,
            }}
          />
          <YAxis
            yAxisId="humid"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "#3b82f6" }}
            tickMargin={10}
            axisLine={{ stroke: "#3b82f6" }}
            label={{
              value: "Humidity (%)",
              angle: -90,
              position: "insideRight",
              fill: "#3b82f6",
              offset: 20,
            }}
          />
          <YAxis
            yAxisId="pressure"
            orientation="right"
            domain={["auto", "auto"]}
            tick={{ fontSize: 12, fill: "#10b981" }}
            tickMargin={40}
            axisLine={{ stroke: "#10b981" }}
            label={{
              value: "Pressure (hPa)",
              angle: -90,
              position: "insideRight",
              fill: "#10b981",
              offset: 40,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
            labelStyle={{
              color: "#4b5563",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
            itemStyle={{ padding: "2px 0" }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(2)}`,
              name.split(" ")[0],
            ]}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            wrapperStyle={{
              paddingBottom: "20px",
              fontSize: "14px",
            }}
          />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temperatura"
            stroke="#ef4444"
            name="Temperature (°C)"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            yAxisId="humid"
            type="monotone"
            dataKey="humedad"
            stroke="#3b82f6"
            name="Humidity (%)"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            yAxisId="pressure"
            type="monotone"
            dataKey="presion"
            stroke="#10b981"
            name="Pressure (hPa)"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};