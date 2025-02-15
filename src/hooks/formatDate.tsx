import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import weekday from 'dayjs/plugin/weekday';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(weekday);
dayjs.extend(advancedFormat);

function formatDate(isoDate: string) {
  return dayjs(isoDate).format('MM/DD');
}

export function formatDateTime(isoDate: string) {
  dayjs.locale('ko');
  const formatted = dayjs(isoDate);
  return formatted.format('M월 D일 (ddd) HH:mm');
}

dayjs.extend(customParseFormat);
dayjs.locale('ko');

export function formatMeetingDates(meetingStart: string, meetingEnd: string) {
  const startDate = dayjs(meetingStart);
  const endDate = dayjs(meetingEnd);

  const startDateTime = startDate.format('YYYY년 M월 D일');

  const startTime = startDate.format('HH:mm');
  const endTime = endDate.format('HH:mm');

  return `${startDateTime} (${startTime} ~ ${endTime})`;
}

export default formatDate;
