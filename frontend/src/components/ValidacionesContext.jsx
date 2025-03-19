import { createContext } from 'react';

export const ValidacionesContext = createContext({
  // Usuario: mínimo 6 caracteres, empieza con letra minúscula, sigue con letras/números
  usuario: /^[a-z][a-z0-9]{5,}$/,
  // Contraseña: mínimo 8, al menos 1 mayúscula y 1 número
  contra: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
});
