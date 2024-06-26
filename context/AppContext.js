// context/AppContext.js
import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [textEmb, setTextEmb] = useState("");
  const [transcriptions, setTranscriptions] = useState([]);

  return (
    <AppContext.Provider
      value={{
        images,
        setImages,
        transcriptions,
        setTranscriptions,
        textEmb,
        setTextEmb,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
