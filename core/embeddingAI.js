const { GoogleGenerativeAI } = require("@google/generative-ai");

let API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export default async function createEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  const embedding = result.embedding;
  return embedding;
}
