import styled from 'styled-components';

import LeftButton from './LeftButton';
import RightButton from './RightButton';
import Title from './Title';

/*
Title, RightButton은 props로 문자열을 받음
해당 문자열이 버튼에 출력됨!
이걸 가지고 BoardHeader, CalendarHeader.. 이런 식으로 가져다 쓰면 됨.
*/

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  return (
    <StyledHeader>
      <LeftButton />
      <Title text="게시판" />
      <RightButton text="⋮" />
    </StyledHeader>
  );
};

export default Header;
