import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { images, setImages } = useAppContext();
  const [uploaded, setUploaded] = useState(false);
  const router = useRouter();
  if (uploaded) {
    router.push("/reorder");
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    setUploaded(true);
  };

  return (
    <div className="flex justify-center items-start h-screen pt-10">
      <div className="bg-gray-800 rounded-lg p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-white">Funcionalidades</h1>
        <ul className="list-disc ml-6 mb-8 text-white">
          <li className="mb-2">
            <strong>Upload de Fotos:</strong> Faça o upload de suas anotações
            manuscritas.
          </li>
          <li className="mb-2">
            <strong>Transcrição Automática:</strong> Converta as anotações
            manuscritas em texto.
          </li>
          <li className="mb-2">
            <strong>Edição Habilitada:</strong> Ordene e edite o texto como
            preferir.
          </li>
          <li className="mb-2">
            <strong>Salve a Transcrição:</strong> Salve as transcrições em um
            arquivo Word.
          </li>
          <li className="mb-2">
            <strong>Chat com AI:</strong> Converse com a AI utilizando as
            informações das anotações transcritas.
          </li>
        </ul>

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mb-4 mt-7 text-white"
        />
      </div>
    </div>
  );
}
