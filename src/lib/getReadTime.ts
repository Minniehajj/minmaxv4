const getReadTime = (totalWords: string): number => {
  const words = totalWords.split(" ").length;
  const minutes = Math.round(words / 200);
  return minutes;
};

export default getReadTime;
