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

  const onToggle = () => {
    setIsMonth(!isMonth);
  };

  return (
    <S.CalendarWrapper>
      <Header
        RightButtonType="MENU"
        onClickRightButton={() => {}}
        // editYear={(newYear: number) => setYear(newYear)}
        // editMonth={(newMonth: number) => setMonth(newMonth)}
      >
        <S.DateWrapper>
          <S.ImgButton src={icLeftArrow} alt="left" />
          <S.Title>
            {year - 2000}년 {isMonth ? `${month}월` : null}
          </S.Title>
          <S.ImgButton src={icRightArrow} alt="right" />
        </S.DateWrapper>
      </Header>
      <S.Content>
        <ToggleButton isMonth={isMonth} onToggle={onToggle} />
        {isMonth ? (
          <MonthCalendar month={month} year={year} />
        ) : (
          <YearCalendar year={year.toString()} />
        )}
      </S.Content>
    </S.CalendarWrapper>
  );
};

export default Calendar;
