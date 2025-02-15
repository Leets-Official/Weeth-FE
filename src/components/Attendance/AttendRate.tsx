import { useEffect, useState } from 'react';
import * as S from '@/styles/attend/AttendMain.styled';
import useGetUserName from '@/hooks/useGetUserName';
import { useNavigate } from 'react-router-dom';
import RightButton from '@/components/Header/RightButton';
import useGetAttend from '@/api/useGetAttend';

const AttendRate = () => {
  const navi = useNavigate();
  const userName = useGetUserName();
  const { attendInfo } = useGetAttend();

  const [attendGauge, setAttendGauge] = useState(0);

  useEffect(() => {
    if (attendInfo) {
      setAttendGauge(attendInfo.attendanceRate ?? 0);
    }
  }, [attendInfo]);

  const dealt = Math.floor((attendGauge / 100) * 100);

  return (
    <S.StyledAttend>
      <S.NameContainer>
        <S.SemiBold>
          <S.AttendName>{userName}&nbsp;</S.AttendName>
        </S.SemiBold>
        <S.AttendText>님의 출석률은</S.AttendText>
      </S.NameContainer>
      <S.AttendPercent>
        <S.TitleWrapper>
          <S.SemiBold>
            <div>{attendGauge}%</div>
          </S.SemiBold>
        </S.TitleWrapper>
        <S.RightButtonWrapper>
          <RightButton onClick={() => navi('/attendCheck')} />
        </S.RightButtonWrapper>
      </S.AttendPercent>
      <S.Progress isAttend={attendGauge}>
        <S.Dealt dealt={dealt} />
      </S.Progress>
    </S.StyledAttend>
  );
};

export default AttendRate;
