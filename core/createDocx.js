import saveAs from "file-saver";

import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

const createTitle = (title) =>
  new Paragraph({
    text: title,
    heading: HeadingLevel.TITLE,
  });

const createLine = (text) =>
  new TextRun({
    children: [text],
    break: 1,
  });

const createContent = (content) => {
  const contentSplited = content.split("\n");
  const lines = contentSplited.map(createLine);
  return new Paragraph({
    children: lines,
  });
};

const createSections = (transcriptions) =>
  transcriptions.map(({ title, content }) => ({
    children: [createTitle(title), createContent(content)],
  }));

export default function createWord(transcriptions) {
  const doc = new Document({
    sections: createSections(transcriptions),
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "example.docx");
  });
}
