import './App.css';
import UsuarioForm from './components/UsuarioForm';
import UsuariosList from './components/UsuariosList';
import Estadisticas from './components/Estadisticas';
import GraficoLenta from './components/GraficoLenta';

export default function App() {
  const mesActual = new Date().toISOString().slice(0, 7);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Control de Insulina</h2>
        <UsuarioForm recargar={() => window.location.reload()} />
        <UsuariosList />
        <Estadisticas mes={mesActual} />
        <h3>Gráfico de la evolución LENTA</h3>
        <GraficoLenta mes={mesActual} />
      </header>
    </div>
  );
}
