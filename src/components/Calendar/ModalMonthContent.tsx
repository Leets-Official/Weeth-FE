import { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import TextButton from '@/components/Header/TextButton';
import DateInput from '@/components/Calendar/DateInput';

interface ModalMonthContentProps {
  origYear: number;
  origMonth: number;
  isMonth: boolean;
  onClickTextButton: () => void;
  editMonth: (numericValue: number) => void;
  editYear: (numericValue: number) => void;
}

const StyledContent = styled.div<{ $isMonth: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.$isMonth ? '275px' : '121px')};
  height: 38px;
  background: ${theme.color.grayScale.gray18};
  border-radius: 14px;
  padding: 20px;
  margin: auto;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const YearButton = styled.div`
  position: fixed;
  width: 370px;
  transform: translate(320px, -80px);
`;

const MonthButton = styled.div`
  position: fixed;
  width: 370px;
  transform: translate(320px, -80px);
`;

const Text = styled.div`
  margin-right: 15px;
`;

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
      <StyledContent $isMonth={isMonth}>
        <MonthButton>
          <TextButton
            text="완료"
            color="mainColor"
            onClick={onClickTextButton}
          />
        </MonthButton>
        <DateInput
          type="number"
          value={year}
          onChange={onChangeYear}
          height="43px"
          width="90px"
          margin="10px"
          inputType="year"
        />
        <Text>년</Text>
        <DateInput
          type="number"
          value={month}
          onChange={onChangeMonth}
          height="43px"
          width="90px"
          margin="10px"
          inputType="month"
        />
        <Text>월</Text>
      </StyledContent>
    );
  }
  // 연력일 경우
  return (
    <StyledContent $isMonth={isMonth}>
      <YearButton>
        <TextButton text="완료" color="mainColor" onClick={onClickTextButton} />
      </YearButton>
      <DateInput
        type="number"
        value={year}
        onChange={onChangeYear}
        height="43px"
        width="90px"
        margin="10px"
        inputType="year"
      />
      <Text>년</Text>
    </StyledContent>
  );
};

export default ModalMonthContent;
