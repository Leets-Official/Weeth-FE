import styled from 'styled-components';

import NextButton from './NextButton';
import PrevButton from './PrevButton';
import Title from './Title';

/*
Title, NextButton은 props로 문자열을 받음
해당 문자열이 버튼에 출력됨!
이걸 가지고 BoardHeader, CalendarHeader.. 이런 식으로 가져다 쓰면 됨.
*/

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <PrevButton />
      <Title text="게시판" />
      <NextButton text="완료" />
      {/* <FinishButton text="다음" /> */}
    </StyledHeader>
  );
};

export default Header;
