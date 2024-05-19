import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { transcriptions } = useAppContext();

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      // Simulate AI response
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          { sender: "ai", text: "Resposta da AI" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Pesquise no Documento</h1>
      <div className="bg-gray-800 p-4 rounded mb-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block p-2 rounded ${message.sender === "user" ? "bg-blue-500" : "bg-green-500"}`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 rounded-l bg-gray-700 border-none text-white"
        />
        <button onClick={sendMessage} className="bg-blue-500 p-2 rounded-r">
          Enviar
        </button>
      </div>
      <div className="mt-4 flex space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Salvar Documento
        </button>
        {transcriptions.length > 0 && (
          <button className="bg-green-500 text-white py-2 px-4 rounded">
            Salvar Chat
          </button>
        )}
      </div>
    </div>
  );
}
