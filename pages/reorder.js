import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";

export default function Reorder() {
  const { images, setImages, setTranscriptions } = useAppContext();
  const [transcribed, setTranscribed] = useState(false);
  const router = useRouter();
  if (transcribed) {
    router.push("/transcriptions");
  }

  const handleDrag = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData("text");
    const reorderedImages = [...images];
    const [draggedImage] = reorderedImages.splice(draggedIndex, 1);
    reorderedImages.splice(index, 0, draggedImage);
    setImages(reorderedImages);
  };

  const handleTranscribe = async () => {
    if (!images) {
      console.error("Nenhum arquivo selecionado");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image);
    });

    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { transcriptions } = await response.json();
        console.log("Transcrição bem-sucedida:", transcriptions);
        setTranscriptions(transcriptions);
        setTranscribed(true);
      } else {
        console.error("Falha ao transcrever arquivo");
      }
    } catch (error) {
      console.error("Erro ao transcrever arquivo:", error);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Reordene as Imagens</h1>
      <p className="text-gray-500 mb-5">
        Você pode arrastar e soltar as imagens para reordená-las.
      </p>
      <div className="flex flex-wrap mx-auto w-3/4">
        {images.map((image, index) => (
          <div
            key={index}
            draggable
            onDragStart={(event) => handleDrag(event, index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, index)}
            className="w-1/4 px-2 mb-10"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              className="rounded-md"
              style={{ aspectRatio: "4/5", flex: "1 1 auto" }}
            />
            <div className="text-center mt-2">{image.name}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-800 text-white py-2 px-20 rounded mt-4"
          onClick={handleTranscribe}
        >
          Transcrever
        </button>
      </div>
    </div>
  );
}
