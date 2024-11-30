import { Client } from 'pg';

// Definimos el tipo de respuesta para las consultas SQL
export interface User {
  id: number;
  name: string;
  email: string;
}

const client = new Client({
  connectionString: process.env.DATABASE_URL, // Variable de entorno con la URL de conexión
  ssl: { rejectUnauthorized: false }, // Si es necesario habilitar SSL
});

// Función para conectar a la base de datos
export const connectToDB = async (): Promise<void> => {
  try {
    await client.connect();
    console.log('Conectado a la base de datos Turso');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};

// Función para realizar una consulta SQL genérica
export const queryDB = async (query: string): Promise<User[]> => {
  try {
    const res = await client.query(query);
    return res.rows as User[]; // Retorna las filas como tipo User[]
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    throw error;
  }
};

// Función para desconectar de la base de datos
export const disconnectFromDB = async (): Promise<void> => {
  try {
    await client.end();
    console.log('Desconectado de la base de datos');
  } catch (error) {
    console.error('Error al desconectar de la base de datos:', error);
  }
};
