import styled from 'styled-components';
import LeftButton from '../Header/LeftButton';
import Title from '../Header/Title';
/*
Title, RightButton은 props로 문자열을 받음
해당 문자열이 버튼에 출력됨!
이걸 가지고 BoardAttendHeader, CalendarAttendHeader.. 이런 식으로 가져다 쓰면 됨.
*/

const StyledAttendHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
`;

const AttendHeader = () => {
  return (
    <StyledAttendHeader>
      <LeftButton />
      <Title text="출석" />
      <div> </div>
    </StyledAttendHeader>
  );
};

export default AttendHeader;