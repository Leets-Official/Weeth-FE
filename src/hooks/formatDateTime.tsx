/*
ISO string 형식의 문자열을
YYYY/MM/DD hh:mm 형식으로 변환

2024-01-01T00:00:00.000Z -> 2024/01/01 00:00
*/

function formatDateTime(createdAt: string) {
  const [date, time] = createdAt.split('T');
  const formattedDate = date.replace(/-/g, '/');
  const formattedTime = time.substr(0, 5);
  return `${formattedDate} ${formattedTime}`;
}

export default formatDateTime;
