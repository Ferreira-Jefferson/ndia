import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { marked } from "marked";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [rowsTextarea, setRowsTextarea] = useState(1);
  const { textEmb } = useAppContext();

  const sendChatMessage = async () => {
    if (!prompt.trim()) {
      setPrompt("");
      return;
    }
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, textEmb }),
      });

      if (response.ok) {
        const { result } = await response.json();
        sendMessage(result);
        console.log("Transcrição bem-sucedida:");
      } else {
        console.error("Falha ao transcrever arquivo");
      }
    } catch (error) {
      console.error("Erro ao transcrever arquivo:", error);
    }
  };
  const sendMessage = (result) => {
    setMessages([...messages, { sender: "user", text: prompt }]);
    setPrompt("");
    setMessages((msgs) => [...msgs, { sender: "ai", text: result }]);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const rows = value.split("\n").length;
    if (rowsTextarea !== rows && rows <= 5) setRowsTextarea(rows);
    setPrompt(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) return;

      event.preventDefault();
      sendChatMessage();
    }
  };
  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Converse com os Documento</h1>
      <div className="bg-gray-800 p-4 rounded mb-4 h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block p-2 rounded ${message.sender === "user" ? "bg-blue-500" : "bg-green-500"}`}
              dangerouslySetInnerHTML={{ __html: marked(message.text) }}
            />
          </div>
        ))}
      </div>
      <div className="flex">
        <textarea
          value={prompt}
          rows={rowsTextarea}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          className="flex-grow p-2 rounded-l bg-gray-700 border-none text-white resize-none"
        />
        <button onClick={sendChatMessage} className="bg-tomato p-2 rounded-r">
          Enviar
        </button>
      </div>
    </div>
  );
}
