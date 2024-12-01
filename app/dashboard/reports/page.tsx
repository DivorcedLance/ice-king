"use client";
import useWeatherData from "@/app/hooks/useWeatherData";
import { WeatherReport } from "@/components/Reports/WeatherReports";
import { mockData } from "@/app/utils/mockData";
import WeatherTable from "@/components/Reports/WeatherTable";
function ReportsPage() {
  const { data: reports } = useWeatherData();

  return (
    <div style={{ padding: "20px" }}>
      {/* <WeatherReport data={mockData} timeRange="24h" /> */}
      {/* Si es tabla */}
      <WeatherTable data={mockData} />
    </div>
  );
}
export default ReportsPage;
