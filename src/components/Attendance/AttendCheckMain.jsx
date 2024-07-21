import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
import Caption from '../Caption';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: ${theme.font.family.pretendard_regular};
  color: ${theme.color.grayScale.white};
`;

const Header = styled.div`
  margin-left: 8%;
`;

const SemiTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  font-size: 16px;
`;

const Penalty = styled.div`
  margin-top: 19px;
  font-size: 32px;
`;

const SemiBold = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  include-font-padding: false;
  display: flex;
  flex-direction: row;
`;

const StyledBox = styled.div`
  background-color: ${theme.color.grayScale.gray18};
  border-radius: 10px;
  margin: 26px 4% 0 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
`;

const SmallStyledBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 92%;
  margin: 15px 4% 0 4%;
`;

const SmallStyledBox = styled.div`
  background-color: ${theme.color.grayScale.gray30};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95px;
  height: 93px;
  text-align: center;
`;

const SmallBoxTitle = styled.div`
  margin-top: 15px;
  font-size: 14px;
`;

const SmallBoxNum = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const Line = styled.div`
  width: 94%;
  height: 1px;
  background-color: ${theme.color.grayScale.gray30};
  margin: 30px 3% 0 3%;
`;

const MeetingInfoBox = styled.div`
  background-color: ${theme.color.grayScale.gray18};
  border-radius: 10px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const MeetingHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5%;
  width: 95%;
`;
const MeetingTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2%;
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;
const MeetingInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-left: 5%;
  font-size: 14px;
  line-height: 1.7;
`;
const StyledText = styled.div`
  margin-top: -2.5px;
`;

const SmallBox = ({ title, num }) => {
  return (
    <SmallStyledBox>
      <SmallBoxTitle>{title}</SmallBoxTitle>
      <SmallBoxNum>{num}</SmallBoxNum>
    </SmallStyledBox>
  );
};

const MeetingBox = ({ attend, title, week, date, place }) => {
  return (
    <MeetingInfoBox>
      <MeetingHeader>
        {attend ? (
          <Caption color={theme.color.main.mainColor}>출석</Caption>
        ) : (
          <Caption color={theme.color.main.negative}>결석</Caption>
        )}
        <MeetingTitle>
          {week}: {title}
        </MeetingTitle>
      </MeetingHeader>
      <MeetingInfo>
        <div>
          날짜: {date}
          <br />
          장소: {place}
        </div>
      </MeetingInfo>
    </MeetingInfoBox>
  );
};

SmallBox.propTypes = {
  title: PropTypes.string.isRequired,
  num: PropTypes.string.isRequired,
};

MeetingBox.propTypes = {
  attend: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  week: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
};

const AttendCheckMain = () => {
  return (
    <Container>
      <Header>
        <SemiTitle>
          <SemiBold>김위드</SemiBold>
          <StyledText>&nbsp;님의 출석횟수</StyledText>
        </SemiTitle>
        <Penalty>
          <SemiBold>3회</SemiBold>
        </Penalty>
      </Header>
      <StyledBox>
        <SmallStyledBoxContainer>
          <SmallBox title="정기 모임" num="8회" />
          <SmallBox title="출석" num="3회" />
          <SmallBox title="결석" num="1회" />
        </SmallStyledBoxContainer>
        <Line />
        <MeetingInfoBox>
          <MeetingBox
            attend
            title="개강총회"
            week="1주차"
            date="2024년 7월 18일 19:00 - 20:30"
            place="가천관 247호"
          />
          <MeetingBox
            title="개강총회"
            week="2주차"
            date="2024년 7월 19일 19:00 - 20:30"
            place="가천관 247호"
          />
          <MeetingBox
            attend
            title="개강총회"
            week="3주차"
            date="2024년 7월 20일 19:00 - 20:30"
            place="가천관 247호"
          />
          <MeetingBox
            attend
            title="개강총회"
            week="4주차"
            date="2024년 7월 21일 19:00 - 20:30"
            place="가천관 247호"
          />
        </MeetingInfoBox>
      </StyledBox>
    </Container>
  );
};

export default AttendCheckMain;
