import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { images, setImages } = useAppContext();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Funcionalidades</h1>
      <ul className="list-disc ml-6 mb-6">
        <li>
          Upload de Fotos: faça upload de fotos das anotações manuscritas.
        </li>
        <li>
          Transcrição Automática: converta as anotações manuscritas em texto e
          cria um arquivo Word.
        </li>
        <li>
          Chat com AI: converse com a AI utilizando as informações das anotações
          transcritas.
        </li>
      </ul>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      <br />
      <Link href="/reorder">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Próximo
        </button>
      </Link>
    </div>
  );
}
