const delay = async (time) => {
  return new Promise((resolve) => setTimeout(resolve, time * 1000));
};

const getTitleAndContent = (transcription) => {
  const splited = transcription.split("\n");
  const title = splited[0].replaceAll("*", "");
  splited.splice(0, 1);
  const content = splited.join("\n");
  return { title, content };
};

export { delay, getTitleAndContent };
