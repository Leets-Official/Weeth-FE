import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from '../Header/LeftButton';
import Title from '../Header/Title';

/*
Title, RightButton은 props로 문자열을 받음
해당 문자열이 버튼에 출력됨!
이걸 가지고 BoardAttendHeader, CalendarAttendHeader.. 이런 식으로 가져다 쓰면 됨.
*/

const StyledAttendHeader = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

// /*
// 오른쪽 버튼이 없어서 정렬이 안 맞을 경우에는
// TitleWrapper 스타일 사용~!
// */
const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

// const onClickRightButton = () => {};
// const onClickTextButton = () => {};

const AttendHeader = ({ text }) => {
  return (
    <StyledAttendHeader>
      <LeftButton />
      <TitleWrapper>
        <Title text={text} />
      </TitleWrapper>
    </StyledAttendHeader>
  );
};

AttendHeader.propTypes = {
  text: PropTypes.string.isRequired,
};
export default AttendHeader;
