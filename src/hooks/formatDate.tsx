/*
ISO string 형식의 문자열을
MM/DD 형식으로 변환

2024-01-01T00:00:00.000Z -> 01/01
*/

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

export default formatDate;
