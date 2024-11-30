import { useState } from 'react';
import { login } from "../Api/Auth"; // Importar la función de login desde la API

export default function Login() {
  const [email, setEmail] = useState(''); // Cambiado a "email" en lugar de "username"
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevenir recarga de la página al enviar el formulario
    console.log("Datos de Login:", { email, password });

    try {
      // Llamada a la función de login de la API
      const data = await login({ email, password });

      console.log("Respuesta del servidor:", data); // Muestra la respuesta completa

      if (data.token) { // Si el servidor devuelve un token
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        alert('Inicio de sesión exitoso');
      } else {
        alert('Credenciales inválidas o error en la respuesta');
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      alert("Hubo un error en la conexión al servidor");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}