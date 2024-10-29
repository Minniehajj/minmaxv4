const getReadTime = (totalWords: string): string => {
  const words = totalWords.split(" ").length;
  const minutes = Math.round(words / 200);
  if (minutes < 1) {
    return "< 1";
  }
  return minutes.toString();
};

export default getReadTime;
