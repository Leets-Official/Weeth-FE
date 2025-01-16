/*
ISO string 형식의 문자열을
MM/DD 형식으로 변환

2024-01-01T00:00:00.000Z -> 01/01
*/

import { WEEK_DAYS } from '@/constants/dateConstants';

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
}

export default formatDate;

export function formatDateTime(isoDate: string) {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const weekday = WEEK_DAYS[date.getDay()];

  return `${month}월 ${day}일 (${weekday}) ${hours}:${minutes}`;
}
