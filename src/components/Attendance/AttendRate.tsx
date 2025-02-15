import * as S from '@/styles/attend/AttendMain.styled';
import useGetUserName from '@/hooks/useGetUserName';
import { useNavigate } from 'react-router-dom';
import RightButton from '@/components/Header/RightButton';

const AttendRate: React.FC<{ attendRate: number | undefined }> = ({
  attendRate,
}) => {
  const navi = useNavigate();
  const userName = useGetUserName();

  const displayedRate = attendRate ?? 0;

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
            <div>{displayedRate}%</div>
          </S.SemiBold>
        </S.TitleWrapper>
        <S.RightButtonWrapper>
          <RightButton onClick={() => navi('/attendCheck')} />
        </S.RightButtonWrapper>
      </S.AttendPercent>
      <S.Progress $attendPercent={displayedRate}>
        <S.Dealt $dealt={Math.floor((displayedRate / 100) * 100)} />
      </S.Progress>
    </S.StyledAttend>
  );
};

export default AttendRate;
