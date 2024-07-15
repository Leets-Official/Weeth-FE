import styled from 'styled-components';

import NextButton from './NextButton';
import PrevButton from './PrevButton';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const DatePicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;

const Header = () => {
  return (
    <StyledHeader>
      <PrevButton />
      <DatePicker>
        <h2>
          {todayYear}년 {todayMonth}월
        </h2>
        <button type="button">▼</button>
      </DatePicker>
      <NextButton text="⋮" />
    </StyledHeader>
  );
};

export default Header;
