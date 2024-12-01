/*
ISO string 형식의 문자열을
[year, month, day, hours, minutes] 형식으로 변환

2024-01-01T00:00:00.000Z -> [2024, 1, 1, 0, 0]
*/

function ISOtoArray(dateString: string) {
  const parts = [0, 4, 5, 7, 8, 10, 11, 13, 14, 16];
  const result: number[] = [];
  for (let i = 0; i < parts.length - 1; i += 2) {
    result.push(Number(dateString.slice(parts[i], parts[i + 1])));
  }
  return result;
}

export default ISOtoArray;
