const { GoogleGenerativeAI } = require("@google/generative-ai");

let API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel(
  { model: "gemini-1.5-flash-latest" },
  { apiVersion: "v1beta" },
);

const chat = model.startChat({
  generationConfig: {
    temperature: 0.2,
  },
});

export default async function Chat(prompt, textEmb) {
  const promptPersonalizado = `
        - Você auxilia o usuário a encontrar respostas do PROMPT no texto que está ao final com o marcador TEXTO.
        - Sempre verifique a resposta não está no TEXTO de referência antes de responder, caso esteja repasse conforme o TEXTO
        - Seu idioma principal é português brasileiro
        
        PROMPT: ${prompt}

        TEXTO: ${textEmb}
        `;

  const result = await chat.sendMessageStream(promptPersonalizado);

  let textResponse = "";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    textResponse += chunkText;
  }

  return textResponse;
}
