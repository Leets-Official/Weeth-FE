import Caption from '@/components/Button/Caption';
import theme from '@/styles/theme';

import * as S from '@/styles/attend/AttendCheck.styled';
import useGetAttendCheck from '@/api/useGetAttendCheck';
import useGetUserName from '@/hooks/useGetUserName';
import { formatMeetingDates } from '@/hooks/formatDate';
import Loading from '@/components/common/Loading';

interface SmallBoxProps {
  title: string;
  num: string;
}
interface MeetingBoxProps {
  attend: 'ATTEND' | 'ABSENT' | 'PENDING';
  title: string;
  date: string;
  place: string;
}
interface MeetingProps {
  id: number;
  title: string;
  start: string;
  end: string;
  status: 'ATTEND' | 'PENDING' | 'ABSENT';
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
  date,
  place,
}) => {
  let captionText = '미결';
  let captionColor = theme.color.gray[65];

  if (attend === 'ATTEND') {
    captionText = '출석';
    captionColor = theme.color.main;
  } else if (attend === 'ABSENT') {
    captionText = '결석';
    captionColor = theme.color.negative;
  }

  return (
    <S.MeetingInfoBox>
      <S.MeetingHeader>
        <Caption color={captionColor}>{captionText}</Caption>
        <S.MeetingTitle>{title}</S.MeetingTitle>
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
  const { attendCheckInfo, error } = useGetAttendCheck();
  const userName = useGetUserName();

  if (error) {
    return <S.SemiBold>error</S.SemiBold>;
  }

  if (!attendCheckInfo) {
    return <Loading />;
  }

  console.log(attendCheckInfo);

  return (
    <S.Container>
      <S.Header>
        <S.SemiTitle>
          <S.SemiBold>{userName}</S.SemiBold>
          &nbsp;님의 출석횟수
        </S.SemiTitle>
        <S.AttendCount>{attendCheckInfo.attendanceCount}회</S.AttendCount>
      </S.Header>
      <S.StyledBox>
        <S.SmallStyledBoxContainer>
          <SmallBox title="정기 모임" num={`${attendCheckInfo.total}회`} />
          <SmallBox title="출석" num={`${attendCheckInfo.attendanceCount}회`} />
          <SmallBox title="결석" num={`${attendCheckInfo.absenceCount}회`} />
        </S.SmallStyledBoxContainer>
        <S.Line />
        {attendCheckInfo.attendances.length > 0 ? (
          attendCheckInfo.attendances.map((meeting: MeetingProps) => {
            return (
              <MeetingBox
                key={meeting.id}
                attend={meeting.status}
                title={meeting.title}
                date={formatMeetingDates(meeting.start, meeting.end)}
                place={meeting.location}
              />
            );
          })
        ) : (
          <S.NullBox>출석 정보가 없습니다.</S.NullBox>
        )}
      </S.StyledBox>
    </S.Container>
  );
};

export default AttendCheckMain;
