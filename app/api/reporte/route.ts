import { NextRequest, NextResponse } from "next/server";
import { queryDB } from "@/lib/db/connection";

// Obtener el ultimo reporte

export async function GET() {
  try {
    // Consulta los últimos 10 reportes
    const query = "SELECT * FROM reportes ORDER BY id DESC LIMIT 10;";
    const reports = await queryDB(query);
    // Consulta el último reporte
    const query2 = "SELECT * FROM reportes ORDER BY id DESC LIMIT 1;";
    const latestReport = await queryDB(query2);
    // Retorna los reportes y el último reporte
    return NextResponse.json(
      {
        reports,
        latestReport: latestReport[0],
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
