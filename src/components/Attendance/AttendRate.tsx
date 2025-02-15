import * as S from '@/styles/attend/AttendMain.styled';
import useGetUserName from '@/hooks/useGetUserName';
import { useNavigate } from 'react-router-dom';
import RightButton from '@/components/Header/RightButton';
import useGetAttend from '@/api/useGetAttend';

const AttendRate = () => {
  // 출석률 게이지 임시 값
  let ATTEND_GAUGE = 0;
  const MAX_ATTEND_GUAGE = 100;
  const navi = useNavigate();

  const userName = useGetUserName();
  const dealt = Math.floor((ATTEND_GAUGE / MAX_ATTEND_GUAGE) * 100);

  const { attendInfo } = useGetAttend();

  ATTEND_GAUGE = attendInfo?.attendanceRate ?? 0;

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
            <div>{ATTEND_GAUGE}%</div>
          </S.SemiBold>
        </S.TitleWrapper>
        <S.RightButtonWrapper>
          <RightButton onClick={() => navi('/attendCheck')} />
        </S.RightButtonWrapper>
      </S.AttendPercent>
      <S.Progress isAttend={ATTEND_GAUGE}>
        <S.Dealt dealt={dealt} />
      </S.Progress>
    </S.StyledAttend>
  );
};

export default AttendRate;
