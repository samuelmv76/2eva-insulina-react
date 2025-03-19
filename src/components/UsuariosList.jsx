import { useEffect, useState } from 'react';
import UsuarioUpdate from './UsuarioUpdate';

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const cargar = async () => {
    const res = await fetch('http://localhost:8080/backend/usuarios.php');
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => { cargar(); }, []);

  const eliminar = async usuario => {
    if (window.confirm(`⚠️ ¿Seguro que quieres eliminar al usuario "${usuario}"?`)) {
      await fetch(`http://localhost:8080/backend/usuarios.php?usuario=${usuario}`, { method: 'DELETE' });
      cargar();
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Fecha Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id_usu}>
              <td>{u.usuario}</td>
              <td>{u.nombre}</td>
              <td>{u.apellidos}</td>
              <td>{u.fecha_nacimiento}</td>
              <td>
                <button onClick={() => setUsuarioEditar(u)}>✏️</button>
                <button onClick={() => eliminar(u.usuario)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuarioEditar && (
        <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
          <UsuarioUpdate
            usuario={usuarioEditar}
            recargar={cargar}
            cerrar={() => setUsuarioEditar(null)}
          />
        </div>
      )}
    </>
  );
}
