/*
[year, month, day, hours, minutes] 형식의 배열을
ISO string 형식의 문자열로 변환

2024-01-01T00:00:00.000Z -> [2024, 1, 1, 0, 0]
*/

export function ArrayToISO(dateArray: number[]): string {
  const [year, month, day, hours, minutes] = dateArray;

  const localDate = new Date(year, month - 1, day, hours, minutes);

  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(localDate.getTime() + kstOffset);

  const yearPart = kstDate.getUTCFullYear();
  const monthPart = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
  const dayPart = String(kstDate.getUTCDate()).padStart(2, '0');
  const hoursPart = String(kstDate.getUTCHours()).padStart(2, '0');
  const minutesPart = String(kstDate.getUTCMinutes()).padStart(2, '0');
  const secondsPart = String(kstDate.getUTCSeconds()).padStart(2, '0');

  return `${yearPart}-${monthPart}-${dayPart}T${hoursPart}:${minutesPart}:${secondsPart}`;
}
export default ArrayToISO;
