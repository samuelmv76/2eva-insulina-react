import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registramos los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function GraficoLenta({ mes }) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Ajusta la URL a donde tengas tu archivo datos_lenta.php
    fetch(`http://localhost:8080/backend/datos_lenta.php?mes=${mes}`)
      .then(response => response.json())
      .then(data => {
        console.log('Datos para el gráfico:', data);
        setDatos(data);
      })
      .catch(err => console.error('Error al cargar datos_lenta:', err));
  }, [mes]);

  // Preparamos labels y valores para Chart.js
  const labels = datos.map(item => `Día ${item.dia}`);
  const valores = datos.map(item => item.lenta);

  const data = {
    labels,
    datasets: [
      {
        label: 'Evolución de LENTA',
        data: valores,
        borderColor: 'blue',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Gráfico de LENTA (${mes})`,
      },
    },
  };

  // Mientras no haya datos, podrías mostrar un "Cargando..." o similar
  if (!datos.length) {
    return <p>Sin datos para el gráfico (o cargando)...</p>;
  }

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
