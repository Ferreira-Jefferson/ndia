import createEmbedding from "../../core/embeddingAI";

const createText = (transcriptions) =>
  transcriptions.reduce((acc, item) => `${acc}\n${item.content}`, "");

export default async function handler(req, res) {
  try {
    const transcriptions = req.body;
    console.log(transcriptions);

    if (!Array.isArray(transcriptions)) {
      throw new Error(
        "O corpo da requisição deve ser um array de transcriptions",
      );
    }

    const embedding = await createEmbedding(createText(transcriptions));
    res.status(200).json({ embedding });
  } catch (error) {
    console.error("Error creating embedding", error);
    res.status(500).json({ error: "Error creating embedding" });
  }
}
