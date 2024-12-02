export const replaceNewLines = (text: string): string => {
  return text.replace(/\r?\n/g, '\n');
};

export default replaceNewLines;
