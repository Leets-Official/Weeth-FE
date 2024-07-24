import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
import TextButton from '../Header/TextButton';

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.isYear ? '121px' : '275px')};
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

const StyledInput = styled.input`
  height: 43px;
  width: 90px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray12};
  color: white;
  text-align: right;
  margin: 0px 10px;
  padding-right: 10px;
  font-size: 16px;
`;

const Text = styled.div`
  margin-right: 15px;
`;

const ModalContent = ({ origYear, origMonth, isYear, onClickTextButton }) => {
  const [year, setYear] = useState(origYear);
  const [month, setMonth] = useState(origMonth);

  const onChangeYear = (e) => {
    setYear(e.target.value);
  };

  const onChangeMonth = (e) => {
    setMonth(e.target.value);
  };

  if (isYear) {
    return (
      <StyledContent isYear={isYear}>
        <YearButton>
          <TextButton
            text="완료"
            color="mainColor"
            onClick={onClickTextButton}
          />
        </YearButton>
        <StyledInput type="number" value={year} onChange={onChangeYear} />
        <Text>년</Text>
      </StyledContent>
    );
  }
  return (
    <StyledContent isYear={isYear}>
      <MonthButton>
        <TextButton text="완료" color="mainColor" onClick={onClickTextButton} />
      </MonthButton>
      <StyledInput type="number" value={year} onChange={onChangeYear} />
      <Text>년</Text>
      <StyledInput type="number" value={month} onChange={onChangeMonth} />
      <Text>월</Text>
    </StyledContent>
  );
};

ModalContent.propTypes = {
  origYear: PropTypes.number.isRequired,
  origMonth: PropTypes.number.isRequired,
  isYear: PropTypes.bool.isRequired,
  onClickTextButton: PropTypes.func.isRequired,
};

export default ModalContent;
