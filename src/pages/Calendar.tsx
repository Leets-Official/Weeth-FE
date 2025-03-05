import { useSearchParams } from 'react-router-dom';
import MonthCalendar from '@/components/Calendar/MonthCalendar';
import CalendarToggle from '@/components/Calendar/CalendarToggle';
import YearCalendar from '@/components/Calendar/YearCalendar';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/calendar/Calendar.styled';
import Header from '@/components/Header/Header';
import icLeftArrow from '@/assets/images/ic_leftArrow.svg';
import icRightArrow from '@/assets/images/ic_rightArrow.svg';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import { useState } from 'react';

const Calendar = () => {
  useCustomBack('/home');
  const [isMonth, setIsMonth] = useState(true);
  const { isAdmin } = useGetGlobaluserInfo();
  const [searchParams, setSearchParams] = useSearchParams();

  const year = Number(searchParams.get('year')) || CURRENT_YEAR;
  const month = Number(searchParams.get('month')) || CURRENT_MONTH;

  const term = (() => {
    const termValue = Number(searchParams.get('term'));
    if (termValue) return termValue;
    return CURRENT_MONTH >= 3 && CURRENT_MONTH <= 9 ? 1 : 2;
  })();

  const updateParams = (
    newYear: number,
    newMonth?: number,
    newTerm?: number,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set('year', String(newYear));

    if (newMonth !== undefined) params.set('month', String(newMonth));
    if (newTerm !== undefined) params.set('term', String(newTerm));

    setSearchParams(params);
  };

  return (
    <S.CalendarWrapper>
      <Header
        RightButtonType="PLUS"
        isAccessible={isAdmin}
        onClickRightButton={() => {}}
      >
        <S.DateWrapper>
          <S.ImgButton
            src={icLeftArrow}
            alt="left"
            onClick={() => {
              if (isMonth) {
                if (month === 1) {
                  updateParams(year - 1, 12);
                } else {
                  updateParams(year, month - 1);
                }
              } else {
                // eslint-disable-next-line no-lonely-if
                if (term === 1) {
                  updateParams(year - 1, undefined, 2);
                } else {
                  updateParams(year, undefined, term - 1);
                }
              }
            }}
          />
          <S.Title>
            {!isMonth && month <= 2 ? year - 2001 : year - 2000}년{' '}
            {isMonth ? `${month}월` : `${term}학기`}
          </S.Title>
          <S.ImgButton
            src={icRightArrow}
            alt="right"
            onClick={() => {
              if (isMonth) {
                if (month === 12) {
                  updateParams(year + 1, 1);
                } else {
                  updateParams(year, month + 1);
                }
              } else {
                // eslint-disable-next-line no-lonely-if
                if (term === 2) {
                  updateParams(year + 1, undefined, 1);
                } else {
                  updateParams(year, undefined, term + 1);
                }
              }
            }}
          />
        </S.DateWrapper>
      </Header>
      <S.Content>
        <CalendarToggle
          isMonth={isMonth}
          onToggle={() => {
            updateParams(year, month, term);
            setIsMonth(!isMonth);
          }}
        />
        {isMonth ? (
          <MonthCalendar />
        ) : (
          <YearCalendar
            year={month === 1 || month === 2 ? year - 1 : year}
            term={term}
          />
        )}
      </S.Content>
    </S.CalendarWrapper>
  );
};

export default Calendar;
