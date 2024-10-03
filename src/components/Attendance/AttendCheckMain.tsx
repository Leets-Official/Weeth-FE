import { useContext } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import Caption from '@/components/Caption';
import { UserContext } from '@/service/UserContext';
import { AttendCheckContext } from '@/service/AttendCheckContext';

interface SmallBoxProps {
  title: string;
  num: string;
}
interface MeetingBoxProps {
  attend: 'ATTEND' | 'ABSENT' | 'NOT_ATTENDED'; 
  title: string;
  week: string;
  date: string;
  place: string;
}
interface MeetingProps {
  id: string;
  title: string;
  start: string; 
  end: string;
  status: 'ATTEND' | 'ABSENT';
  weekNumber: number;
  location: string;
}


// Styled Components
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
  margin: 13px 5% 0 5%;
  font-size: 14px;
  line-height: 1.7;
`;

const StyledText = styled.div`
  margin-top: -2.5px;
`;

const NullBox = styled.div`
  margin: 20px 0;
`;

const SmallBox: React.FC<SmallBoxProps> = ({ title, num }) => {
  return (
    <SmallStyledBox>
      <SmallBoxTitle>{title}</SmallBoxTitle>
      <SmallBoxNum>{num}</SmallBoxNum>
    </SmallStyledBox>
  );
};

const MeetingBox: React.FC<MeetingBoxProps> = ({ attend, title, week, date, place }) => {
  let captionText = '미결';
  let captionColor = theme.color.grayScale.mediumGray;

  if (attend === 'ATTEND') {
    captionText = '출석';
    captionColor = theme.color.main.mainColor;
  } else if (attend === 'ABSENT') {
    captionText = '결석';
    captionColor = theme.color.main.negative;
  }

  return (
    <MeetingInfoBox>
      <MeetingHeader>
        <Caption color={captionColor}>{captionText}</Caption>
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

const AttendCheckMain: React.FC = () => {
  const { attendanceData, attendFetchError } = useContext(AttendCheckContext);
  const { userData } = useContext(UserContext);

  if (attendFetchError) {
    return <div>error</div>;
  }

  if (!attendanceData) {
    return <div>Loading...</div>;
  }

  let userName = 'loading';
  if (userData) {
    userName = userData.name;
  }

  return (
    <Container>
      <Header>
        <SemiTitle>
          <SemiBold>{userName}</SemiBold>
          <StyledText>&nbsp;님의 출석횟수</StyledText>
        </SemiTitle>
        <Penalty>
          <SemiBold>{attendanceData.attendanceCount}회</SemiBold>
        </Penalty>
      </Header>
      <StyledBox>
        <SmallStyledBoxContainer>
          <SmallBox title="정기 모임" num={`${attendanceData.total}회`} />
          <SmallBox title="출석" num={`${attendanceData.attendanceCount}회`} />
          <SmallBox title="결석" num={`${attendanceData.absenceCount}회`} />
        </SmallStyledBoxContainer>
        <Line />
        {attendanceData.attendances.length > 0 ? (
          attendanceData.attendances.map((meeting : MeetingProps) => {
            const startDate = new Date(meeting.start);
            const endDate = new Date(meeting.end);

            const dateOptions: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            const startDateTime = startDate.toLocaleDateString('ko-KR', dateOptions);

            const timeOptions: Intl.DateTimeFormatOptions = {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            };
            const startTime = startDate.toLocaleTimeString('ko-KR', timeOptions);
            const endTime = endDate.toLocaleTimeString('ko-KR', timeOptions);

            const formattedDate = `${startDateTime} (${startTime} ~ ${endTime})`;

            return (
              <MeetingBox
                key={meeting.id}
                attend={meeting.status}
                title={meeting.title}
                week={`${meeting.weekNumber}주차`}
                date={formattedDate}
                place={meeting.location}
              />
            );
          })
        ) : (
          <NullBox> </NullBox>
        )}
      </StyledBox>
    </Container>
  );
};

export default AttendCheckMain;
