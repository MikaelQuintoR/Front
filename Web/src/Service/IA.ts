import axiosInstance from "../Utils/AxiosInstance";

// GET - Recupera todos los chats asociados al usuario autenticado
export const getChats = async (): Promise<unknown> => {
    try {
        const response = await axiosInstance.get('/api/chats');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los chats:', error);
        throw new Error('Error al recuperar los chats. Por favor, intenta nuevamente.');
    }
};

// POST - Crea un nuevo chat asociado al usuario autenticado
export const createChat = async (data: { name: string }): Promise<unknown> => {
    try {
        const response = await axiosInstance.post('/api/chats', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear un chat:', error);
        throw new Error('Error al crear el chat. Por favor, intenta nuevamente.');
    }
};

//GET - Recupera los mensajes de un chat específico
export const getChatMessages = async (chatId: string): Promise<unknown> => {
    try {
        const response = await axiosInstance.get(`/api/chats/${chatId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los mensajes del chat:', error);
        throw new Error('Error al recuperar los mensajes del chat. Por favor, intenta nuevamente.');
    }
};

// POST - Envía un mensaje en un chat
export const sendMessage = async (data: { content: string; chatId: string; aiModel: string }): Promise<unknown> => {
    try {
        const response = await axiosInstance.post('/api/messages', data);
        return response.data;
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw new Error('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
};


export default { getChats, createChat, getChatMessages, sendMessage };