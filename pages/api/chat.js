import Chat from "../../core/chatAI";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { prompt, textEmb } = req.body;
      const result = await Chat(prompt, textEmb);
      res.status(200).json({ result });
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Error" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
