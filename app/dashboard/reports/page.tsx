"use client";
import useWeatherData from "@/app/hooks/useWeatherData";
import { WeatherReport } from "@/components/Reports/WeatherReports";
import WeatherTable from "@/components/Reports/WeatherTable";
function ReportsPage() {
  const { data: reports } = useWeatherData();

  return (
    <div style={{ padding: "20px" }}>
      <WeatherReport data={reports} timeRange="24h" />
      {/* Si es tabla */}
      <WeatherTable data={reports} />
    </div>
  );
}
export default ReportsPage;
