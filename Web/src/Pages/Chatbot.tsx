import React, { useState, useEffect } from 'react';
import { getChats, createChat, getChatMessages, sendMessage } from '../Service/IA';

const ChatbotPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatName, setChatName] = useState('');

  useEffect(() => {
    // Obtener todos los chats al cargar la página
    const fetchChats = async () => {
      try {
        const chatData = await getChats();
        setChats(chatData);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    // Si hay un chat seleccionado, obtener los mensajes de ese chat
    const fetchMessages = async () => {
      if (selectedChat) {
        try {
          const messagesData = await getChatMessages(selectedChat);
          setMessages(messagesData);
        } catch (error) {
            console.error('Error', error);
        }
      }
    };

    fetchMessages();
  }, [selectedChat]);

  const handleCreateChat = async () => {
    if (chatName.trim()) {
      try {
        const newChat = await createChat({ name: chatName });
        setChats([...chats, newChat]);
        setChatName('');
      } catch (error) {
        console.error('Error', error);
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
        setMessages([...messages, response.data]); // Asumimos que `response.data` es el nuevo mensaje
        setNewMessage('');
      } catch (error) {
        console.error('Error', error);
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
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
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
