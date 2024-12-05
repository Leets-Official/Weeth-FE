/* eslint-disable no-nested-ternary */
import check from '@/assets/images/ic_check.svg';
import icClose from '@/assets/images/ic_close.svg';
import theme from '@/styles/theme';

import * as S from '@/styles/attend/ModalPenalty.styled';
import useGetPenalty from '@/api/usePenalty';
import useGetUserName from '@/hooks/useGetUserName';

interface CloseButtonProps {
  onClick: () => void;
}
interface PenaltyBoxProps {
  date: string;
  reason: string;
}
interface ModalPenaltyProps {
  open: boolean;
  close: () => void;
}
interface PenaltyProps {
  penaltyId: number;
  penaltyDescription: string;
  time: string; // ISO 8601 형식의 날짜 문자열
}

// CloseButton Component
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <S.ImgButton onClick={onClick}>
      <img src={icClose} alt="Close" />
    </S.ImgButton>
  );
};

const PenaltyBox: React.FC<PenaltyBoxProps> = ({ date, reason }) => {
  return (
    <S.PenaltyDetail>
      <S.PenaltyIcon>+1</S.PenaltyIcon>
      <S.PenaltyTextBox>
        <S.PenaltyText>{date}</S.PenaltyText>
        <S.PenaltyText>사유 : {reason}</S.PenaltyText>
      </S.PenaltyTextBox>
    </S.PenaltyDetail>
  );
};

// ModalPenalty Component
const ModalPenalty: React.FC<ModalPenaltyProps> = ({ open, close }) => {
  const { penaltyInfo, error } = useGetPenalty();

  const userName = useGetUserName();

  return (
    <S.StyledModal open={open}>
      <S.Regular>
        <div className="modal-content" style={{ width: '320px' }}>
          <div className="modal-header">
            <img src={check} alt="Check" className="modal-check-icon" />
            <CloseButton onClick={close} />
          </div>
          <div className="modal-body">
            {error ? (
              <div>Error loading penalty data</div>
            ) : !penaltyInfo || !penaltyInfo.Penalties.length ? (
              <div>저장된 패널티가 없습니다.</div>
            ) : (
              <>
                <S.SemiBold className="modal-title">
                  {userName} 님의&nbsp;
                  <div style={{ color: theme.color.negative }}>패널티</div>
                  &nbsp;횟수
                </S.SemiBold>
                <S.SemiBold className="modal-penalty">
                  {penaltyInfo?.penaltyCount}회
                </S.SemiBold>
                <S.Line />
                {penaltyInfo.Penalties.map((penalty: PenaltyProps) => {
                  const myDate = new Date(penalty.time);
                  const formattedDate = `${myDate.getFullYear()}년 ${
                    myDate.getMonth() + 1
                  }월 ${myDate.getDate()}일 ${myDate.getHours()}:${myDate
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`;
                  return (
                    <PenaltyBox
                      key={penalty.penaltyId}
                      reason={penalty.penaltyDescription}
                      date={formattedDate}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </S.Regular>
    </S.StyledModal>
  );
};

export default ModalPenalty;
