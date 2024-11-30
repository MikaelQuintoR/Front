import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();  // Prevenir recarga de la página al enviar el formulario
    console.log("Datos de Login:", { username, password });

    try {
      const response = await fetch('https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data); // Muestra la respuesta completa

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
      } else {
        console.log(`Error ${response.status}: ${data.message || 'Credenciales inválidas'}`);
        alert('Error en las credenciales');
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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