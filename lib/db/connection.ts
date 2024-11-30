import { createClient } from '@libsql/client';

// Configura el cliente para Turso
export const pool = createClient({
  url: process.env.DATABASE_URL as string, // URL de conexión a Turso
  authToken: process.env.DATABASE_AUTH_TOKEN, // Token de autenticación (si aplica)
});

// Exporta una función genérica para ejecutar consultas
export const queryDB = async (query: string, params: any[] = []) => {
  try {
    const result = await pool.execute({sql: query, args: params}); // Asegúrate de pasar params
    return result.rows; // Devuelve las filas de la consulta
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    throw error;
  }
};