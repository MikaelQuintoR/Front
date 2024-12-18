import axiosInstance from "../Utils/AxiosInstance";
import { getToken } from "./Auth";
import { Chat, Message } from "../interfaces/Interfaz";

// GET - Recupera todos los chats asociados al usuario autenticado
export const getChats = async () => {
    const token = getToken();

    // Si no hay token, retorna un error sencillo
    if (!token) {
        throw new Error('No se encontró un token de autenticación. Por favor, inicie sesión.');
    }

    try {
        // Realizar la solicitud con el token en el encabezado
        const response = await axiosInstance.get('/api/chats', {
            headers: {
                Authorization: `Bearer ${token}`, // Enviar el token como Bearer en el encabezado
            },
        });
        
        return response.data as Chat[]; // Aseguramos que la respuesta es un arreglo de chats

    } catch (error) {
        console.error('Error al obtener los chats:', error);
        throw new Error('Error al recuperar los chats.');
    }
};

// POST - Crea un nuevo chat asociado al usuario autenticado
export const createChat = async (data: { name: string }) => {
    const token = getToken(); // Obtener el token almacenado en localStorage

    if (!token) {
        throw new Error('No se encontró un token de autenticación. Por favor, inicie sesión.');
    }

    try {
        // Realizar la solicitud con el token en los encabezados
        const response = await axiosInstance.post('/api/chats', data, {
            headers: {
                Authorization: `Bearer ${token}`, // Enviar el token como Bearer en el encabezado
            },
        });

        return response.data as Chat; // Aseguramos que la respuesta es un solo chat creado
    } catch (error) {
        console.error('Error al crear un chat:', error);
        throw new Error('Error al crear el chat. Por favor, intenta nuevamente.');
    }
};

// GET - Recupera los mensajes de un chat específico
export const getChatMessages = async (chatId: number) => {
    try {
        const response = await axiosInstance.get(`/api/chats/${chatId}`);
        return response.data as Message[]; // Aseguramos que la respuesta es un arreglo de mensajes
    } catch (error) {
        console.error('Error al obtener los mensajes del chat:', error);
        throw new Error('Error al recuperar los mensajes del chat. Por favor, intenta nuevamente.');
    }
};

// POST - Envía un mensaje en un chat
export const sendMessage = async (data: { content: string; chatId: number; aiModel: string }) => {
    try {
        const response = await axiosInstance.post('/api/messages', data);
        return response.data as Message; // Aseguramos que la respuesta es un mensaje
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        throw new Error('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
};

export default { getChats, createChat, getChatMessages, sendMessage };