import { useState } from 'react';
import { register } from "../Service/Auth"; // Importar la función de registro

export default function Register() {
  const [step, setStep] = useState(1); // Estado para manejar los pasos del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevenir recarga de la página

    try {
      // Llamar a la función de registro desde Auth.ts
      const data = await register({ firstName: '', lastName: '', email, password }); // Ajustar según estructura del backend
      setStep(2); // Cambiar al siguiente paso




      
    } catch (error: any) {
      console.error("Error al registrar:", error);
      alert(error.message || "Hubo un problema al conectar con el servidor.");
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
              Registrar
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">¡Registro completo!</h2>
          <p className="text-gray-700">Ahora puedes iniciar sesión con tus credenciales.</p>
        </div>
      )}
    </div>
  );
}
