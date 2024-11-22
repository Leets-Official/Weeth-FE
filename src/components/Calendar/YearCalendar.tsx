import getYearlySchedule from '@/api/YearlyScheduleAPI';
import { MONTH } from '@/constants/dateConstants';
import * as S from '@/styles/calendar/YearCalendar.styled';
import { useEffect, useState } from 'react';
import YearlyCard from './YearlyCard';

const YearCalendar = ({ year }: { year: string }) => {
  const validYear = year.toString().length === 4 ? parseInt(year, 10) : 2024;

  // TODO: 서버 수정 후 자세한 타입 지정
  const [yearlySchedule, setYearlySchedule] = useState<Record<number, any>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (year) {
          const response = await getYearlySchedule(
            `${year}-01-01T00:00:00.000Z`,
            `${year}-12-31T23:59:59.999Z`,
          );
          if (response.data.code === 200) {
            setYearlySchedule(response.data.data);
          } else {
            console.error(response.data.message);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [year]);

  return (
    <S.MonthlyBox>
      <S.FirstHalfMonth>
        {MONTH.filter(
          (monthItem) => yearlySchedule && monthItem >= 1 && monthItem <= 6,
        ).map((monthItem) => (
          <YearlyCard
            key={monthItem}
            thisMonth={monthItem}
            year={validYear}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
      </S.FirstHalfMonth>
      <S.SecondHalfMonth>
        {MONTH.filter(
          (monthItem) => yearlySchedule && monthItem >= 7 && monthItem <= 12,
        ).map((monthItem) => (
          <YearlyCard
            key={monthItem}
            thisMonth={monthItem}
            year={validYear}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
      </S.SecondHalfMonth>
    </S.MonthlyBox>
  );
};

export default YearCalendar;
