import axiosInstance from "../utils/AxiosInstance";

// Register
export const register = async (data: { email: string; password: string }): Promise<unknown> => {
    try {
        const response = await axiosInstance.post('/api/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Error al registrar:', error);
        throw new Error('Error en el registro. Por favor, intenta nuevamente.');
    }
};

// Login
export const login = async (data: { email: string; password: string }): Promise<unknown> => {
    try {
        const response = await axiosInstance.post('/api/auth/login', data);
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw new Error('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
    }
};

export default { register, login };