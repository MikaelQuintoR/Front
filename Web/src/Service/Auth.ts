import axiosInstance from "../Utils/AxiosInstance";

// Register - Registrar un nuevo usuario en el sistema. Recibe los datos del usuario (nombre, apellido, correo, contraseña).
export const register = async (data: { name: string, lastname: string, email: string; password: string }) => {
    try {
        const response = await axiosInstance.post('/api/register', data);
        localStorage.setItem("token", response.data.token as string);
    } catch (error) {
        console.error('Error al registrar:', error);
        throw new Error('Error en el registro. Por favor, intenta nuevamente.');
    }
};

// GET - Obtener token almacenado en localStorage
export const getToken = () => {
    const data = localStorage.getItem("token");
    return data;
};

// Login
export const login = async (data: { email: string; password: string }) => {
    try {
        const response = await axiosInstance.post('/api/login', data);
        localStorage.setItem("token", response.data.token as string);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw new Error('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
    }
};

export default { register, login };