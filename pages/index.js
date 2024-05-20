import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const router = useRouter();
  const { images, setImages } = useAppContext();
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    setUploaded(true);
  };

  if (uploaded) {
    router.push("/reorder");
  }

  return (
    <div className="flex justify-center items-start h-screen pt-20">
      <div className="bg-gray-800 rounded-lg p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-white">Funcionalidades</h1>
        <ul className="list-disc ml-6 mb-8 text-white">
          <li className="mb-3">
            <strong>Upload de Fotos:</strong> faça upload de fotos das anotações
            manuscritas.
          </li>
          <li className="mb-3">
            <strong>Transcrição Automática:</strong> converta as anotações
            manuscritas em texto e cria um arquivo Word.
          </li>
          <li className="mb-3">
            <strong>Chat com AI:</strong> converse com a AI utilizando as
            informações das anotações transcritas.
          </li>
        </ul>

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mb-4 mt-10"
        />
      </div>
    </div>
  );
}
