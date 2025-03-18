const convertLinksInText = (text: string) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    linkRegex,
    (link) => `<a href="${link}" target="_blank">${link}</a>`,
  );
};

export default convertLinksInText;
