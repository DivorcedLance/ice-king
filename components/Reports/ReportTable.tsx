'use client'

import React, { useState, useEffect } from 'react';

export type Report = {
  temperatura: number;
  presion: number;
  altitud: number;
  humedad: number;
  distancia: number;
};

const ReportTable: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/reporte', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al consumir la API');
      }
  
      const data = await response.json();
      setReports(data.reports);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    console.log('reports', reports);
  }, [reports]);

  return (
    <div>
      <h1>Reportes de Sensores</h1>
      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Temperatura</th>
              <th>Presión</th>
              <th>Altitud</th>
              <th>Humedad</th>
              <th>Distancia</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.temperatura}°C</td>
                <td>{report.presion} hPa</td>
                <td>{report.altitud} m</td>
                <td>{report.humedad} %</td>
                <td>{report.distancia} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportTable;