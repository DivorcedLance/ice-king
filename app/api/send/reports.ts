import { NextApiRequest, NextApiResponse } from 'next';

export type Report = { 
    temperatura: number;
    presion: number;
    altitud: number;
    humedad: number;
    distancia: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data : Report= req.body;
        res.status(200).json({ message: 'Data received successfully', data });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}