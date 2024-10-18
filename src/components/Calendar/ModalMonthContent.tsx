import DateInput from '@/components/Calendar/DateInput';
import TextButton from '@/components/Header/TextButton';
import * as S from '@/styles/calendar/ModalMonthContent.styled';
import { useState } from 'react';

interface ModalMonthContentProps {
  origYear: number;
  origMonth: number;
  isMonth: boolean;
  onClickTextButton: () => void;
  editMonth: (numericValue: number) => void;
  editYear: (numericValue: number) => void;
}

const ModalMonthContent: React.FC<ModalMonthContentProps> = ({
  origYear,
  origMonth,
  isMonth,
  onClickTextButton,
  editMonth,
  editYear,
}) => {
  const [year, setYear] = useState(origYear);
  const [month, setMonth] = useState(origMonth);

  const onChangeYear = (value: string | number) => {
    let numericValue: number;

    if (typeof value === 'number') {
      numericValue = value;
    } else {
      numericValue = parseInt(value, 10);
    }

    if (!Number.isNaN(numericValue)) {
      setYear(numericValue);
      editYear(numericValue);
    } else {
      const defaultValue = 2024;
      setYear(defaultValue);
      editYear(defaultValue);
    }
  };

  const onChangeMonth = (value: string | number) => {
    let numericValue: number;

    if (typeof value === 'number') {
      numericValue = value;
    } else {
      numericValue = parseInt(value, 10);
    }

    if (!Number.isNaN(numericValue)) {
      setMonth(numericValue);
      editMonth(numericValue);
    }
  };

  if (isMonth) {
    // 달력일 경우
    return (
      <S.StyledContent $isMonth={isMonth}>
        <S.MonthButton>
          <TextButton
            text="완료"
            color="mainColor"
            onClick={onClickTextButton}
          />
        </S.MonthButton>
        <DateInput
          type="number"
          value={year}
          onChange={onChangeYear}
          height="43px"
          width="90px"
          margin="10px"
          inputType="year"
        />
        <S.Text>년</S.Text>
        <DateInput
          type="number"
          value={month}
          onChange={onChangeMonth}
          height="43px"
          width="90px"
          margin="10px"
          inputType="month"
        />
        <S.Text>월</S.Text>
      </S.StyledContent>
    );
  }
  // 연력일 경우
  return (
    <S.StyledContent $isMonth={isMonth}>
      <S.YearButton>
        <TextButton text="완료" color="mainColor" onClick={onClickTextButton} />
      </S.YearButton>
      <DateInput
        type="number"
        value={year}
        onChange={onChangeYear}
        height="43px"
        width="90px"
        margin="10px"
        inputType="year"
      />
      <S.Text>년</S.Text>
    </S.StyledContent>
  );
};

export default ModalMonthContent;
