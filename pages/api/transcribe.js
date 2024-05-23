import { IncomingForm } from "formidable";
import fs from "fs";
import transcribeImage from "../../core/imageTranscriptAI";
import { delay, getTitleAndContent } from "../../utils/index";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the files", err);
      return res.status(500).json({ error: "Error parsing the files" });
    }

    const imageList = files.file;
    let transcriptions = [];

    for (let image of imageList) {
      await delay(2);
      const transcription = await transcribeImage(image);
      const { originalFilename } = image;
      const titleAndContent = getTitleAndContent(transcription);
      transcriptions = [
        ...transcriptions,
        { originalFilename, ...titleAndContent },
      ];
    }
    try {
      res.status(200).json({ transcriptions });
    } catch (error) {
      console.error("Error transcribing file", error);
      res.status(500).json({ error: "Error transcribing file" });
    } finally {
      // Remover o arquivo temporário criado pelo formidable
      for (let { filepath } of imageList) fs.unlinkSync(filepath);
    }
  });
}
