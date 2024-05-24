import Link from "next/link";
import { useAppContext } from "../context/AppContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaGripVertical } from "react-icons/fa";
import createWord from "../core/createDocx";

export default function Transcriptions() {
  const { images, transcriptions, setTranscriptions, setTextEmb } =
    useAppContext();

  const handleContentChange = (index, content) => {
    const updatedTranscriptions = [...transcriptions];
    updatedTranscriptions[index].content = content;
    setTranscriptions(updatedTranscriptions);
  };

  const createTextEmb = () => {
    const result = transcriptions.reduce(
      (acc, item) => `${acc}\n${item.title}\n${item.content}`,
      "",
    );
    setTextEmb(result);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(transcriptions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTranscriptions(items);
  };

  const saveWord = () => {
    createWord(transcriptions);
  };

  return (
    <div className="p-8">
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Transcrições</h1>
        <p className="text-gray-500">
          Você pode editar os textos conforme desejar.
        </p>
        {images.length > 1 && (
          <p className="text-gray-500">
            Você pode arrastar e soltar para reordená-las.
          </p>
        )}
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="transcriptions">
          {(provided) => (
            <ul
              className="mb-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {transcriptions.map((transcription, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className="mb-4 flex items-center"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FaGripVertical className="mr-2 cursor-pointer" />
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold">
                          {transcription.title}
                        </h2>
                        <textarea
                          value={transcription.content}
                          onChange={(e) =>
                            handleContentChange(index, e.target.value)
                          }
                          className="w-full border p-2"
                        ></textarea>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-800 text-white py-2 px-20 rounded mt-4 mr-2"
          onClick={saveWord}
        >
          Salvar Word
        </button>
        <Link href="/chat">
          <button
            className="bg-gray-800 text-white py-2 px-20 rounded mt-4 ml-2"
            onClick={createTextEmb}
          >
            Iniciar Chat
          </button>
        </Link>
      </div>
    </div>
  );
}
