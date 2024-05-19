import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";

export default function Transcriptions() {
  const { images, transcriptions, setTranscriptions } = useAppContext();

  useEffect(() => {
    if (transcriptions.length === 0 && images.length > 0) {
      const initialTranscriptions = images.map((image, index) => ({
        title: `Imagem ${index + 1}`,
        content: `Conteúdo transcrito da imagem ${index + 1}`,
      }));
      setTranscriptions(initialTranscriptions);
    }
  }, [images, transcriptions, setTranscriptions]);

  const handleContentChange = (index, content) => {
    const updatedTranscriptions = [...transcriptions];
    updatedTranscriptions[index].content = content;
    setTranscriptions(updatedTranscriptions);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Transcrições</h1>
      <ul className="mb-6">
        {transcriptions.map((transcription, index) => (
          <li key={index} className="mb-4">
            <h2 className="text-lg font-semibold">{transcription.title}</h2>
            <textarea
              value={transcription.content}
              onChange={(e) => handleContentChange(index, e.target.value)}
              className="w-full border p-2"
            ></textarea>
          </li>
        ))}
      </ul>
      <Link href="/chat">
        <button className="bg-green-500 text-white py-2 px-4 rounded">
          Iniciar Chat
        </button>
      </Link>
    </div>
  );
}
