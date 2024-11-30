import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db/connection'; // Importar la conexión de la base de datos

// Define el tipo para el reporte
export type Report = {
  temperatura: number;
  presion: number;
  altitud: number;
  humedad: number;
  distancia: number;
};

// Endpoint para manejar el POST
export async function POST(req: NextRequest) {
  try {
    // Parsear el cuerpo del request
    const body: Report = await req.json();

    // Insertar los datos en la base de datos
    const query = `
      INSERT INTO reportes (temperatura, presion, altitud, humedad, distancia)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [body.temperatura, body.presion, body.altitud, body.humedad, body.distancia];
    const result = await pool.query(query, values);

    // Retorna la respuesta con los datos insertados
    return NextResponse.json({
      message: 'Datos almacenados correctamente',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error al procesar el request:', error);
    return NextResponse.json({ error: 'Error al almacenar los datos' }, { status: 500 });
  }
}

// Endpoint para manejar el GET
export async function GET(req: NextRequest) {
  try {
    // Realizar la consulta SQL a la base de datos
    const query = 'SELECT * FROM reportes ORDER BY id DESC LIMIT 10;';
    const result = await pool.query(query);

    // Retornar los datos obtenidos como respuesta en formato JSON
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error al procesar el request:', error);
    return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 });
  }
}