import { useContext, useState } from 'react';
import { ValidacionesContext } from './ValidacionesContext';

export default function UsuarioForm({ recargar }) {
  const regex = useContext(ValidacionesContext);
  const [datos, setDatos] = useState({
    usuario: '',
    contra: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: ''
  });

  const validarEdad = fecha =>
    new Date().getFullYear() - new Date(fecha).getFullYear() >= 18;

  const enviar = async () => {
    if (!regex.usuario.test(datos.usuario)) {
      alert('⚠️ Usuario inválido: mínimo 6 caracteres, empieza con letra minúscula.');
      return;
    }
    if (!regex.contra.test(datos.contra)) {
      alert('⚠️ Contraseña inválida: mínimo 8 caracteres, 1 mayúscula y 1 número.');
      return;
    }
    if (!datos.nombre.trim() || !datos.apellidos.trim()) {
      alert('⚠️ Nombre y apellidos son obligatorios.');
      return;
    }
    if (!validarEdad(datos.fecha_nacimiento)) {
      alert('⚠️ El usuario debe tener mínimo 18 años.');
      return;
    }

    await fetch('http://localhost:8080/backend/usuarios.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    recargar();
  };

  return (
    <div>
      <input
        placeholder="Usuario"
        onChange={e => setDatos({ ...datos, usuario: e.target.value })}
      />
      <input
        placeholder="Contraseña"
        type="password"
        onChange={e => setDatos({ ...datos, contra: e.target.value })}
      />
      <input
        placeholder="Nombre"
        onChange={e => setDatos({ ...datos, nombre: e.target.value })}
      />
      <input
        placeholder="Apellidos"
        onChange={e => setDatos({ ...datos, apellidos: e.target.value })}
      />
      <input
        type="date"
        onChange={e => setDatos({ ...datos, fecha_nacimiento: e.target.value })}
      />
      <button onClick={enviar}>Guardar</button>
    </div>
  );
}
