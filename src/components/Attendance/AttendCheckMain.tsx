import { useContext } from 'react';
import theme from '@/styles/theme';
import Caption from '@/components/Button/Caption';
import { UserContext } from '@/api/UserContext';
import { AttendCheckContext } from '@/api/AttendCheckContext';

import * as S from '@/styles/attend/AttendCheck.styled';

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

const SmallBox: React.FC<SmallBoxProps> = ({ title, num }) => {
  return (
    <S.SmallStyledBox>
      <S.SmallBoxTitle>{title}</S.SmallBoxTitle>
      <S.SmallBoxNum>{num}</S.SmallBoxNum>
    </S.SmallStyledBox>
  );
};

const MeetingBox: React.FC<MeetingBoxProps> = ({
  attend,
  title,
  week,
  date,
  place,
}) => {
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
    <S.MeetingInfoBox>
      <S.MeetingHeader>
        <Caption color={captionColor}>{captionText}</Caption>
        <S.MeetingTitle>
          {week}: {title}
        </S.MeetingTitle>
      </S.MeetingHeader>
      <S.MeetingInfo>
        <div>
          날짜: {date}
          <br />
          장소: {place}
        </div>
      </S.MeetingInfo>
    </S.MeetingInfoBox>
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
    <S.Container>
      <S.Header>
        <S.SemiTitle>
          <S.SemiBold>{userName}</S.SemiBold>
          <S.StyledText>&nbsp;님의 출석횟수</S.StyledText>
        </S.SemiTitle>
        <S.Penalty>
          <S.SemiBold>{attendanceData.attendanceCount}회</S.SemiBold>
        </S.Penalty>
      </S.Header>
      <S.StyledBox>
        <S.SmallStyledBoxContainer>
          <SmallBox title="정기 모임" num={`${attendanceData.total}회`} />
          <SmallBox title="출석" num={`${attendanceData.attendanceCount}회`} />
          <SmallBox title="결석" num={`${attendanceData.absenceCount}회`} />
        </S.SmallStyledBoxContainer>
        <S.Line />
        {attendanceData.attendances.length > 0 ? (
          attendanceData.attendances.map((meeting: MeetingProps) => {
            const startDate = new Date(meeting.start);
            const endDate = new Date(meeting.end);

            const dateOptions: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            const startDateTime = startDate.toLocaleDateString(
              'ko-KR',
              dateOptions,
            );

            const timeOptions: Intl.DateTimeFormatOptions = {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            };
            const startTime = startDate.toLocaleTimeString(
              'ko-KR',
              timeOptions,
            );
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
          <S.NullBox> </S.NullBox>
        )}
      </S.StyledBox>
    </S.Container>
  );
};

export default AttendCheckMain;
