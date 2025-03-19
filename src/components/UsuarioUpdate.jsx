import { useState, useContext } from 'react';
import { ValidacionesContext } from './ValidacionesContext';

export default function UsuarioUpdate({ usuario, recargar, cerrar }) {
  const regex = useContext(ValidacionesContext);

  const [datos, setDatos] = useState({
    contra: '',
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    fecha_nacimiento: usuario.fecha_nacimiento
  });

  const validarEdad = fecha =>
    new Date().getFullYear() - new Date(fecha).getFullYear() >= 18;

  const enviarUpdate = async () => {
    if (!regex.contra.test(datos.contra)) {
      alert('⚠️ Contraseña incorrecta: mínimo 8 caracteres, 1 mayúscula y 1 número.');
      return;
    }
    if (!datos.nombre.trim()) {
      alert('⚠️ El nombre no puede estar vacío.');
      return;
    }
    if (!datos.apellidos.trim()) {
      alert('⚠️ Los apellidos no pueden estar vacíos.');
      return;
    }
    if (!validarEdad(datos.fecha_nacimiento)) {
      alert('⚠️ El usuario debe tener mínimo 18 años.');
      return;
    }

    // Usamos el nuevo endpoint para actualizar
    const url = `http://localhost:8080/backend/usuarios_update.php?id_usu=${usuario.id_usu}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    const respuesta = await res.json();
    alert(respuesta.msg || respuesta.error);

    recargar();
    cerrar();
  };

  return (
    <div>
      <h4>Actualizar Usuario: {usuario.usuario}</h4>
      <input
        type="password"
        placeholder="Contraseña (mín 8 caracteres, 1 Mayús, 1 Núm)"
        onChange={e => setDatos({ ...datos, contra: e.target.value })}
      />
      <input
        defaultValue={usuario.nombre}
        placeholder="Nombre nuevo"
        onChange={e => setDatos({ ...datos, nombre: e.target.value })}
      />
      <input
        defaultValue={usuario.apellidos}
        placeholder="Apellidos nuevos"
        onChange={e => setDatos({ ...datos, apellidos: e.target.value })}
      />
      <input
        type="date"
        defaultValue={usuario.fecha_nacimiento}
        onChange={e => setDatos({ ...datos, fecha_nacimiento: e.target.value })}
      />
      <button onClick={enviarUpdate}>Actualizar</button>
      <button onClick={cerrar}>Cancelar</button>
    </div>
  );
}
