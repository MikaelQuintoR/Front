import { useState, useEffect } from "react";

// Importar las funciones necesarias para interactuar con los endpoints
import { getChats, createChat, getChatMessages, sendMessage } from "../Service/IA";

export default function ChatPage() {
  const [token] = useState(localStorage.getItem("token")); // Recuperar el token desde localStorage
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    if (token) {
      loadChats(); // Cargar chats al entrar a la página
    }
  }, [token]);

  const loadChats = async () => {
    try {
      const fetchedChats = await getChats(); // Recuperar chats del usuario autenticado
      setChats(fetchedChats);
    } catch (error) {
      console.error("Error al cargar los chats:", error);
      alert("No se pudieron cargar los chats. Verifica tu conexión.");
    }
  };

  const handleCreateChat = async () => {
    try {
      const newChat = await createChat({ name: chatName }); // Crear nuevo chat
      setChats([...chats, newChat]);
      setChatName("");
    } catch (error) {
      console.error("Error al crear el chat:", error);
      alert("No se pudo crear el chat. Verifica tu conexión.");
    }
  };

  const handleSelectChat = async (chatId: number) => {
    setSelectedChat(chatId);
    try {
      const chatMessages = await getChatMessages(chatId); // Recuperar mensajes del chat seleccionado
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error al cargar mensajes del chat:", error);
      alert("No se pudieron cargar los mensajes. Verifica tu conexión.");
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage || !selectedChat) return;
    try {
      const sentMessage = await sendMessage({ content: newMessage, chatID: selectedChat, aiModel: "gpt-4" }); // Enviar mensaje
      setMessages([...messages, sentMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("No se pudo enviar el mensaje. Verifica tu conexión.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar para los chats */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <ul>
          {chats.map((chat: any) => (
            <li
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={`p-2 cursor-pointer rounded-lg ${
                selectedChat === chat.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              {chat.name}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Nuevo chat"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button
            onClick={handleCreateChat}
            className="w-full bg-blue-500 text-white py-2 mt-2 rounded-lg"
          >
            Crear Chat
          </button>
        </div>
      </div>

      {/* Panel de mensajes */}
      <div className="w-3/4 bg-white p-4 flex flex-col">
        {selectedChat ? (
          <>
            <h2 className="text-xl font-bold mb-4">Chat seleccionado</h2>
            <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4">
              {messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`p-2 mb-2 rounded-lg ${
                    message.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Enviar
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-500">Selecciona un chat para comenzar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
