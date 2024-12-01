import { AlertsList } from "@/components/Alert/AlertsList";

function AlertPage() {
  return (
    <AlertsList
      alerts={[
        {
          severity: "critical",
          type: "temperature",
          timestamp: new Date().toISOString(),
          message: "Server is down",
        },
        {
          severity: "warning",
          timestamp: new Date().toISOString(),
          type: "humidity",

          message: "High latency detected",
        },
      ]}
    />
  );
}

export default AlertPage;
