import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";

export default function Reorder() {
  const { images, setImages } = useAppContext();

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Reordene as Imagens</h1>
      <div className="mb-6">
        {images.map((image, index) => (
          <div
            key={index}
            draggable
            onDragStart={(event) => handleDrag(event, index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, index)}
            className="border p-2 mb-2"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Image ${index + 1}`}
              className="h-32 w-32 object-cover"
            />
          </div>
        ))}
      </div>
      <Link href="/transcriptions">
        <button className="bg-green-500 text-white py-2 px-4 rounded">
          Próximo
        </button>
      </Link>
    </div>
  );
}
