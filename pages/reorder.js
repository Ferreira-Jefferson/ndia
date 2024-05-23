import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";

export default function Reorder() {
  const { images, setImages, setTranscriptions } = useAppContext();
  const [transcribed, setTranscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  if (transcribed) {
    router.push("/transcriptions");
  }

  useEffect(() => {
    let interval;

    if (loading) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1; // Incrementa a porcentagem
          } else {
            clearInterval(interval);
            return 100; // Garante que a porcentagem não passe de 100
          }
        });
      }, 130 * images.length); // Ajuste o intervalo conforme necessário
    }

    return () => clearInterval(interval);
  }, [loading]);

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

    setLoading(true);
    setProgress(0);

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
        console.log("Transcrição bem-sucedida:");
        setTranscriptions(transcriptions);
        setTranscribed(true);
      } else {
        console.error("Falha ao transcrever arquivo");
      }
    } catch (error) {
      console.error("Erro ao transcrever arquivo:", error);
    } finally {
      setProgress(100);
      setLoading(false);
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
          disabled={loading}
          className="bg-gray-800 text-white py-2 px-20 rounded mt-4"
          onClick={handleTranscribe}
        >
          Transcrever
        </button>
      </div>
      <div className="relative">
        {loading && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white mb-4"></div>
            <div className="text-white text-xl">{progress}%</div>
          </div>
        )}
      </div>
    </div>
  );
}
