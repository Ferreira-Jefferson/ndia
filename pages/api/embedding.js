import createEmbedding from "../../core/embeddingAI";

export default async function handler(req, res) {
  try {
    const textEmb = req.body;

    if (!textEmb) {
      throw new Error(
        "O corpo da requisição deve possuir o texto concatenado da transcrição",
      );
    }

    const embedding = await createEmbedding(textEmb);
    res.status(200).json({ embedding });
  } catch (error) {
    console.error("Error creating embedding", error);
    res.status(500).json({ error: "Error creating embedding" });
  }
}
