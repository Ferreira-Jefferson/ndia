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

function createImageParts(imagePaths) {
  return imagePaths.map((imagePath) => {
    const splited = imagePath.split(".");
    const extension = splited[splited.length - 1];
    return;
  });
}

async function transcribeImage(image) {
  const { filepath, mimetype } = image;
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Transcribe this picture";

  const imagePart = fileToGenerativePart(filepath, mimetype);

  const result = await model.generateContent([prompt, imagePart]);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
}

export default transcribeImage;

// async function asnwer(prompt, textarea) {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//   const system_instruction =
//     "Você é um product owner da metodolodia scrum, sempre segue o que o usuário solicitou, considerando o máximo de detalhes possíveis para responder com a maior exatidão possível, sempre utilizando uma linguagem clara e objetiva. \n\n";
//   const prompt_with_system_instruction = system_instruction + prompt;
//   const result = await model.generateContentStream(
//     prompt_with_system_instruction,
//   );
// }
