import axiosInstance from "../Utils/AxiosInstance";

// Register - Registrar un nuevo usuario en el sistema. Recibe los datos del usuario (nombre, apellido, correo, contraseña).
export const register = async (data: { name: string, lastname: string, email: string; password: string }): Promise<unknown> => {
    try {
        const response = await axiosInstance.post('/api/register', data);
        return response.data;
    } catch (error) {
        console.error('Error al registrar:', error);
        throw new Error('Error en el registro. Por favor, intenta nuevamente.');
    }
};

// Login
export const login = async (data: { email: string; password: string }): Promise<unknown> => {
    try {
        const response = await axiosInstance.post('/api/login', data);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw new Error('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
    }
};

export default { register, login };