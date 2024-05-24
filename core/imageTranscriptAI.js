const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

let API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function transcribeImage(image) {
  const { filepath, mimetype } = image;
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = `
  - Você é especialista em reconhecimento de texto, cálculos e formulas em imagens.
  - Transcreva os textos contidos na imagens
  - Transcreva textos e corrija os erros ortográficos.
  - Cálculos em formato de fração você transcreve como divisão (x/y)
  - Ignore textos riscados
  - Se for um caderno, cuidado para não achar que as linhas do caderno são textos
  - Crie um título curto para o texto transcrito
  - A resposta deve possuir o título no início e na linha abaixo o conteúdo transcrito
  - Sample output:
    Titulo da transcricao
    Conteudo transcrito
  `;

  const imagePart = fileToGenerativePart(filepath, mimetype);

  const result = await model.generateContent([prompt, imagePart]);
  const response = result.response;
  return response.text();
}

export default transcribeImage;
