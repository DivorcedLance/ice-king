import { NextApiRequest, NextApiResponse } from 'next';
import { queryDB } from '@/lib/db/config'; // Importamos la función para consultar la base de datos

// El handler debe manejar las peticiones GET
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    try {
      // Realizamos la consulta SQL a la tabla "users"
      const users = await queryDB('SELECT * FROM users');
      res.status(200).json(users); // Respondemos con los datos de los usuarios
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  } else {
    res.status(405).end(); // Método no permitido si no es GET
  }
}
