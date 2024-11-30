import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // Estado para manejar el flujo de pasos

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();  // Prevenir recarga de la página al enviar el formulario

    try {
      const response = await fetch('https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }), // Enviar los primeros datos
      });

      const data = await response.json();  // Obtener respuesta

      if (response.ok) {
        setStep(2); // Si la primera parte fue exitosa, muestra el siguiente paso para completar el registro
      } else {
        console.log(data); // Para depurar la respuesta
        alert(data.message || 'Error al crear el usuario');
      }
    } catch (error) {
      console.error("Error al intentar crear usuario:", error);
      alert("Hubo un error en la conexión al servidor");
    }
  };

  const handleCompleteRegistration = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Realizar la solicitud para completar el registro con nombre y correo
      const response = await fetch('https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/auth/register-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, username, password, role }), // Incluir todos los datos necesarios
      });

      const data = await response.json();
      if (response.ok) {
        alert('Usuario registrado exitosamente');
      } else {
        alert('Error al completar el registro');
        console.log(data);
      }
    } catch (error) {
      console.error("Error al completar el registro:", error);
      alert("Hubo un error al intentar completar el registro");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      {step === 1 ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>
          <form onSubmit={handleRegister} className="space-y-4">
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
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="client">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Continuar con el registro
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">Completa tu registro</h2>
          <form onSubmit={handleCompleteRegistration} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Completar registro
            </button>
          </form>
        </>
      )}
    </div>
  );
}