import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

/**
 *  'YYYY.MM.DD' 형식으로 변환하는 날짜 유틸 함수
 * @param {string | null | undefined} time - 변환할 날짜 값
 * @returns {string} 변환된 날짜 문자열 또는 '날짜 없음'
 */

const formatDate = (time: string | null | undefined): string => {
  if (!time) return '날짜 없음';
  return dayjs(time).tz('Asia/Seoul').format('YYYY.MM.DD');
};

export default formatDate;
