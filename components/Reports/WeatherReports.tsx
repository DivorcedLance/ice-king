"use client";

import { WeatherData } from "@/app/types/weather";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { parse } from "date-fns";

interface WeatherReportProps {
  data: WeatherData[];
}

export function WeatherReport({ data }: WeatherReportProps) {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [chartData, setChartData] = useState<{
    time: string;
    temperature: number;
    altitude: number;
    humidity: number;
    pressure: number;
  }[]>([]);

  useEffect(() => {
    const filterDataByDateRange = (
      data: WeatherData[],
      startDate: string,
      endDate: string
    ) => {
      if (!data || data.length === 0) return [];

      const start = new Date(startDate + "T00:00:00");
      const end = new Date(endDate + "T23:59:59");

      return data.filter((item) => {
        const itemDate = parse(item.created_at, "dd/MM/yyyy, HH:mm:ss", new Date());
        return itemDate >= start && itemDate <= end;
      });
    };

    const filteredData =
      startDate && endDate ? filterDataByDateRange(data, startDate, endDate) : [];

    setChartData(
      filteredData.map((item) => ({
        time: item.created_at,
        temperature: item.temperatura,
        altitude: item.altitud,
        humidity: item.humedad,
        pressure: item.presion,
      }))
    );
  }, [data, startDate, endDate]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    setStartDate(
      parse(data[data.length - 1].created_at, "dd/MM/yyyy, HH:mm:ss", new Date())
        .toISOString()
        .split("T")[0]
    );
    setEndDate(
      parse(data[data.length - 1].created_at, "dd/MM/yyyy, HH:mm:ss", new Date())
        .toISOString()
        .split("T")[0]
    );
  }, [data]);

  return (
    <div className="space-y-6 flex flex-col items-center px-4 md:px-8">
      {/* Rango de fechas */}
      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium">Fecha de inicio</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium">Fecha de fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Temperatura (°C)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer
                config={{
                  temperature: {
                    label: "Temperatura (°C)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full min-h-[200px] max-h-[400px] sm:h-[250px]"
              >
                <BarChart data={chartData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="temperature" fill="var(--color-temperature)" />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Presión Atmosférica (hPa)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer
                config={{
                  pressure: {
                    label: "Presión Atmosférica (hPa)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full min-h-[200px] max-h-[400px] sm:h-[250px]"
              >
                <BarChart data={chartData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="pressure" fill="var(--color-pressure)" />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Altitud (m)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer
                config={{
                  altitude: {
                    label: "Altitud (m)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-full min-h-[200px] max-h-[400px] sm:h-[250px]"
              >
                <BarChart data={chartData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="altitude" fill="var(--color-altitude)" />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Humedad (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer
                config={{
                  humidity: {
                    label: "Humedad (%)",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-full min-h-[200px] max-h-[400px] sm:h-[250px]"
              >
                <BarChart data={chartData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="humidity" fill="var(--color-humidity)" />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>

  );
}
