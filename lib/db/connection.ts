import { Pool } from 'pg';

// Configura la conexión a la base de datos
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // URL de conexión desde las variables de entorno
  ssl: { rejectUnauthorized: false }, // Habilita SSL si es necesario
});

// Manejo de errores
pool.on('error', (err) => {
  console.error('Error en el pool de conexiones:', err);
});