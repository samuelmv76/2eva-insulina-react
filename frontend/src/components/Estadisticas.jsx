import { useEffect, useState } from 'react';

export default function Estadisticas({ mes }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/backend/estadisticas.php?mes=${mes}`)
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta Estadísticas:', data);
        setStats(data);
      })
      .catch(err => console.error('Error en fetch:', err));
  }, [mes]);

  if (!stats) return <p>Cargando estadísticas...</p>;

  return (
    <div>
      <h3>Estadísticas Insulina LENTA ({mes})</h3>
      <p>Media: {stats.media}</p>
      <p>Mínima: {stats.minima}</p>
      <p>Máxima: {stats.maxima}</p>
    </div>
  );
}
