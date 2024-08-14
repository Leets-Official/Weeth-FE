import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from '../Header/LeftButton';
import Title from '../Header/Title';

const StyledAttendHeader = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

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
