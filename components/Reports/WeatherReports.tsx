"use client";

import { WeatherData } from "@/app/types/weather";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
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
  const [chartData, setChartData] = useState<any[]>([]);

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

    const filteredData = startDate && endDate 
      ? filterDataByDateRange(data, startDate, endDate)
      : [];

    setChartData(filteredData.map((item) => ({
      time: item.created_at,
      temperature: item.temperatura,
      altitude: item.altitud,
      humidity: item.humedad,
      pressure: item.presion,
    })))
  }, [data, startDate, endDate]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    setStartDate(parse(data[data.length - 1].created_at, "dd/MM/yyyy, HH:mm:ss", new Date()).toISOString().split("T")[0])
    setEndDate(parse(data[data.length - 1].created_at, "dd/MM/yyyy, HH:mm:ss", new Date()).toISOString().split("T")[0])
  }, [data]);

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Rango de fechas */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {setEndDate(e.target.value)}}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Temperature Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                temperature: {
                  label: "Temperature (°C)",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="temperature" fill="var(--color-temperature)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Altitude Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                altitude: {
                  label: "Altitude (m)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="altitude" fill="var(--color-altitude)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Humidity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                humidity: {
                  label: "Humidity (%)",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="humidity" fill="var(--color-humidity)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pressure Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                pressure: {
                  label: "Pressure (hPa)",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="pressure" fill="var(--color-pressure)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
