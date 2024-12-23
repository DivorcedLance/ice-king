import { NextRequest, NextResponse } from "next/server";
import { queryDB } from "@/lib/db/connection";

export async function GET() {
  try {
    const query = "SELECT * FROM reportes ORDER BY id ASC;";
    const reports = await queryDB(query);
    return NextResponse.json(
      {
        reports: reports.map((report) => {
          const utcTimestamp = (report.created_at as string).replace(" ", "T") + "Z";
          const dateInUTC = new Date(utcTimestamp);
          return {
            ...report,
            created_at: new Intl.DateTimeFormat("es-MX", {
              timeZone: "America/Lima",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }).format(dateInUTC),
          };
        }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    return NextResponse.json(
      { error: "Error al consultar la base de datos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Inserta un nuevo reporte
    const query = `
      INSERT INTO reportes (temperatura, presion, altitud, humedad, distancia)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *;
    `;
    const values = [
      body.temperatura,
      body.presion,
      body.altitud,
      body.humedad,
      body.distancia,
    ];
    const result = await queryDB(query, values); // Pasa los parámetros

    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    console.error("Error al insertar los datos:", error);
    return NextResponse.json(
      { error: "Error al insertar los datos" },
      { status: 500 }
    );
  }
}
