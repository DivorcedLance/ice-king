import { NextRequest, NextResponse } from 'next/server';
import { queryDB } from '@/lib/db/config'; // Función para consultar la base de datos

// Manejar la petición GET
export async function GET(req: NextRequest) {
  try {
    // Realizamos la consulta SQL a la base de datos (por ejemplo, obteniendo todos los usuarios)
    const users = await queryDB('SELECT * FROM estacion_meteorologica');

    // Retornar los datos obtenidos como respuesta en formato JSON
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    // En caso de error, respondemos con un código de error y mensaje
    return NextResponse.json({ error: 'Error al obtener los datos' }, { status: 500 });
  }
}
