const convertLinksInText = (text: string) => {
  const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  return text.replace(linkRegex, (link) => {
    let modifiedLink = link;
    if (modifiedLink.startsWith('www.')) {
      modifiedLink = `https://${modifiedLink}`;
    }
    return `<a href="${modifiedLink}" target="_blank">${modifiedLink}</a>`;
  });
};

export default convertLinksInText;
