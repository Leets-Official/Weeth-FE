import * as S from '@/styles/attend/AttendMain.styled';
import theme from '@/styles/theme';
import RightButton from '@/components/Header/RightButton';

interface PenaltyInfoProps {
  penaltyCount: number | undefined;
  handleOpenPenaltyModal: () => void;
}

export const MyPenaltyInfo: React.FC<PenaltyInfoProps> = ({
  penaltyCount,
  handleOpenPenaltyModal,
}) => {
  return (
    <S.PenaltyContainer>
      <S.ButtonContainer>
        <S.SemiBold>
          패널티&nbsp;
          <div style={{ color: theme.color.negative }}>{penaltyCount}회</div>
        </S.SemiBold>
        <RightButton onClick={handleOpenPenaltyModal} />
      </S.ButtonContainer>
      <S.PenaltyCount>
        패널티가 {penaltyCount}회 적립이 되었어요.
        <br />
        어떤 이유인지 알아볼까요?
      </S.PenaltyCount>
    </S.PenaltyContainer>
  );
};

export const PenaltyInfo = () => {
  return (
    <S.PenaltyInfo>
      패널티를 받는 기준은 아래와 같아요
      <br />
      - 정기 모임에 출석을 하지 않았을 때
      <br />
      - 미션을 제출하지 않았을 때
      <br />
      - 스터디 발표를 하지 않았을 때
      <br />
    </S.PenaltyInfo>
  );
};
