import styled from 'styled-components';
import LeftButton from '@/components/Header/LeftButton';
import Title from '@/components/Header/Title';

interface AttendHeaderProp {
  text: string;
}

const StyledAttendHeader = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const AttendHeader: React.FC<AttendHeaderProp> = ({ text }) => {
  return (
    <StyledAttendHeader>
      <LeftButton />
      <TitleWrapper>
        <Title text={text} />
      </TitleWrapper>
    </StyledAttendHeader>
  );
};

export default AttendHeader;
