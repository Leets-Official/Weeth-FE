import { useState } from 'react';
import MonthCalendar from '@/components/Calendar/MonthCalendar';
import ToggleButton from '@/components/Calendar/ToggleButton';
import YearCalendar from '@/components/Calendar/YearCalendar';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/calendar/Calendar.styled';
import Header from '@/components/Header/Header';
import icLeftArrow from '@/assets/images/ic_leftArrow.svg';
import icRightArrow from '@/assets/images/ic_rightArrow.svg';

const Calendar = () => {
  useCustomBack('/home');
  const [isMonth, setIsMonth] = useState(true);
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [term, setTerm] = useState(() => {
    if (CURRENT_MONTH >= 3 && CURRENT_MONTH <= 9) {
      return 1;
    }
    return 2;
  });

  const onToggle = () => {
    setIsMonth(!isMonth);
  };

  return (
    <S.CalendarWrapper>
      <Header RightButtonType="MENU" onClickRightButton={() => {}}>
        <S.DateWrapper>
          <S.ImgButton
            src={icLeftArrow}
            alt="left"
            onClick={() => {
              if (isMonth) {
                switch (month) {
                  case 1:
                    setYear(year - 1);
                    setMonth(12);
                    break;
                  default:
                    setMonth(month - 1);
                    break;
                }
              }
              if (!isMonth) {
                switch (term) {
                  case 1:
                    setYear(year - 1);
                    setTerm(2);
                    break;
                  default:
                    setTerm(term - 1);
                    break;
                }
              }
            }}
          />
          <S.Title>
            {year - 2000}년 {isMonth ? `${month}월` : `${term}학기`}
          </S.Title>
          <S.ImgButton
            src={icRightArrow}
            alt="right"
            onClick={() => {
              if (isMonth) {
                switch (month) {
                  case 12:
                    setYear(year + 1);
                    setMonth(1);
                    break;
                  default:
                    setMonth(month + 1);
                    break;
                }
              }
              if (!isMonth) {
                switch (term) {
                  case 2:
                    setYear(year + 1);
                    setTerm(1);
                    break;
                  default:
                    setTerm(term + 1);
                    break;
                }
              }
            }}
          />
        </S.DateWrapper>
      </Header>
      <S.Content>
        <ToggleButton isMonth={isMonth} onToggle={onToggle} />
        {isMonth ? (
          <MonthCalendar month={month} year={year} />
        ) : (
          <YearCalendar year={year.toString()} term={term} />
        )}
      </S.Content>
    </S.CalendarWrapper>
  );
};

export default Calendar;
