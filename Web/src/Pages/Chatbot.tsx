import React, { useState, useEffect } from 'react';
import { getChats, createChat, getChatMessages, sendMessage } from '../Service/IA';

interface Chat {
  id: string;
  name: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
}

const ChatbotPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);  // Especificamos el tipo de chats
  const [selectedChat, setSelectedChat] = useState<string | null>(null);  // El chat seleccionado es un string o null
  const [messages, setMessages] = useState<Message[]>([]);  // Especificamos el tipo de mensajes
  const [newMessage, setNewMessage] = useState<string>('');
  const [chatName, setChatName] = useState<string>('');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatData = await getChats();
        // Verifica que chatData sea un array
        if (Array.isArray(chatData)) {
          setChats(chatData);  // Se asigna correctamente si chatData es un array
        } else {
          console.error('Los datos de los chats no son un array', chatData);
        }
      } catch (error) {
        console.error('Error al obtener los chats:', error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        try {
          const messagesData = await getChatMessages(selectedChat);
          // Verifica que messagesData sea un array
          if (Array.isArray(messagesData)) {
            setMessages(messagesData);  // Asignamos el array de mensajes
          } else {
            console.error('Los datos de los mensajes no son un array', messagesData);
          }
        } catch (error) {
          console.error('Error al obtener los mensajes del chat:', error);
        }
      }
    };

    fetchMessages();
  }, [selectedChat]);

  const handleCreateChat = async () => {
    if (chatName.trim()) {
      try {
        const newChat = await createChat({ name: chatName });
        if (newChat && Array.isArray(chats)) {
          setChats([...chats, newChat]);  // Se añade un nuevo chat correctamente
        }
        setChatName('');
      } catch (error) {
        console.error('Error al crear el chat:', error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      const messageData = {
        content: newMessage,
        chatId: selectedChat,
        aiModel: 'gpt-3.5-turbo', // O el modelo de AI que estés utilizando
      };
      try {
        const response = await sendMessage(messageData);
        // Verifica que response.data sea el mensaje adecuado
        if (response.data && Array.isArray(messages)) {
          setMessages([...messages, response.data]);  // Se agrega el mensaje a la lista
        }
        setNewMessage('');
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  };

  return (
    <div className="chatbot-page">
      <h1>Chatbot</h1>
      <div className="chat-list">
        <h3>Mis Chats</h3>
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} onClick={() => setSelectedChat(chat.id)}>
              {chat.name}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          placeholder="Nuevo chat"
        />
        <button onClick={handleCreateChat}>Crear Chat</button>
      </div>

      {selectedChat && (
        <div className="chat-box">
          <h3>Chat Seleccionado</h3>
          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                <p>{msg.content}</p>
              </div>
            ))}
          </div>

          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;
