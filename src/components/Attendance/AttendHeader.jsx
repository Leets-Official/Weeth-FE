import styled from 'styled-components';
import LeftButton from '../Header/LeftButton';
import Title from '../Header/Title';

const StyledAttendHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
`;

//  해당 함수에 온클릭 이벤트 작성
const onClickButton = () => {};

const AttendHeader = () => {
  return (
    <StyledAttendHeader>
      <LeftButton onClick={onClickButton} />
      <Title text="출석" />
      <div> </div>
    </StyledAttendHeader>
  );
};

export default AttendHeader;
