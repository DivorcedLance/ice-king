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
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { useMediaQuery } from "react-responsive";

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
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });

  const formattedData = data.map((item) => ({
    ...item,
    tiempo: format(
      parse(item.created_at, "dd/MM/yyyy, HH:mm:ss", new Date()),
      "dd/MM HH:mm",
      { locale: es }
    ),
  }));

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl shadow-lg p-8 h-[500px] mx-auto max-w-[1200px] w-full sm:h-[600px] md:h-[700px] lg:h-[800px]">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Tendencias Meteorológicas
      </h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={formattedData}
          margin={{ top: 0, right: 20, left: isSmallScreen ? 20 : 50, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          {!isSmallScreen && (
            <>
              <XAxis
                dataKey="tiempo"
                tick={{ fontSize: 12, fill: "#4b5563" }}
                tickMargin={10}
                axisLine={{ stroke: "#9ca3af" }}
                label={{
                  value: "Fecha y Hora",
                  position: "insideBottomRight",
                  offset: -15,
                  fill: "#4b5563",
                }}
              />
              <YAxis
                yAxisId="temp"
                domain={["auto", "auto"]}
                tick={{ fontSize: 12, fill: "#ef4444" }}
                tickMargin={10}
                axisLine={{ stroke: "#ef4444" }}
              />
              <YAxis
                yAxisId="humid"
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: "#3b82f6" }}
                tickMargin={10}
                axisLine={{ stroke: "#3b82f6" }}
              />
              <YAxis
                yAxisId="pressure"
                domain={["auto", "auto"]}
                tick={{ fontSize: 12, fill: "#10b981" }}
                tickMargin={10}
                axisLine={{ stroke: "#10b981" }}
              />
            </>
          )}
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
            height={isSmallScreen ? 80 : 36 }
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
            name="Temperatura (°C)"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            yAxisId="humid"
            type="monotone"
            dataKey="humedad"
            stroke="#3b82f6"
            name="Humedad (%)"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            yAxisId="pressure"
            type="monotone"
            dataKey="presion"
            stroke="#10b981"
            name="Presión (hPa)"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
