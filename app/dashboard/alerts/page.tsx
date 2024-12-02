import { AlertsList } from "@/components/Alert/AlertsList";

function AlertPage() {
  return (
    <AlertsList
      alerts={[
        {
          severity: "critical",
          type: "temperature",
          timestamp: new Date().toISOString(),
          message: "Temperature too high",
        },
        {
          severity: "warning",
          timestamp: new Date().toISOString(),
          type: "humidity",

          message: "Humidity too high",
        },
      ]}
    />
  );
}

export default AlertPage;
