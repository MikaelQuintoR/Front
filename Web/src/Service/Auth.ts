import axiosInstance from "../Utils/AxiosInstance";
import { User } from "../Interfaces/Interfaz";

// Register - Registrar un nuevo usuario en el sistema. Recibe los datos del usuario (nombre, apellido, correo, contraseña).
export const register = async (user: User) => {
    try {
        const response = await axiosInstance.post('/api/register', user);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token as string); // Guardamos el token si está presente
        } else {
            throw new Error('No se recibió token después del registro');
        }
    } catch (error) {
        console.error('Error al registrar:', error);
        throw new Error('Error en el registro. Por favor, intenta nuevamente.');
    }
};

// GET - Obtener token almacenado en localStorage
export const getToken = (): string | null => {
    return localStorage.getItem("token"); // Retorna el token almacenado, o null si no existe
};

// Login - Iniciar sesión de usuario
export const login = async (data: { email: string; password: string }) => {
    try {
        const response = await axiosInstance.post('/api/login', data);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token as string); // Guardamos el token si está presente
        } else {
            throw new Error('No se recibió token después del login');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw new Error('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
    }
};

export default { register, login, getToken };