'use client';

import React, { useState } from 'react';

const ReportForm: React.FC = () => {
  const [formData, setFormData] = useState({
    temperatura: '',
    presion: '',
    altitud: '',
    humedad: '',
    distancia: '',
  });

  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponseMessage(null);

    try {
      const response = await fetch('/api/reporte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperatura: parseFloat(formData.temperatura),
          presion: parseFloat(formData.presion),
          altitud: parseFloat(formData.altitud),
          humedad: parseFloat(formData.humedad),
          distancia: parseFloat(formData.distancia),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const data = await response.json();
      setResponseMessage('Datos enviados correctamente');
      console.log('Respuesta del servidor:', data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Enviar Reporte</h1>
      {loading && <p>Enviando datos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="temperatura">Temperatura (°C):</label>
          <input
            type="number"
            name="temperatura"
            value={formData.temperatura}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="presion">Presión (hPa):</label>
          <input
            type="number"
            name="presion"
            value={formData.presion}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="altitud">Altitud (m):</label>
          <input
            type="number"
            name="altitud"
            value={formData.altitud}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="humedad">Humedad (%):</label>
          <input
            type="number"
            name="humedad"
            value={formData.humedad}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="distancia">Distancia (km):</label>
          <input
            type="number"
            name="distancia"
            value={formData.distancia}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;