/* eslint-disable no-nested-ternary */
import warning from '@/assets/images/ic_warning.svg';
import icClose from '@/assets/images/ic_close.svg';
import theme from '@/styles/theme';

import * as S from '@/styles/attend/ModalPenalty.styled';
import useGetPenalty from '@/api/useGetPenalty';
import useGetUserName from '@/hooks/useGetUserName';

import {
  StyledModal,
  ModalContent,
  ModalHeader,
} from '@/styles/attend/CommonModal.styled';
import { formatDateTime } from '@/hooks/formatDate';

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
  time: string;
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
        <div>{date}</div>
        <div>사유 : {reason}</div>
      </S.PenaltyTextBox>
    </S.PenaltyDetail>
  );
};

// ModalPenalty Component
const ModalPenalty: React.FC<ModalPenaltyProps> = ({ open, close }) => {
  const { penaltyInfo, error } = useGetPenalty();

  const userName = useGetUserName();

  return (
    <StyledModal open={open}>
      <ModalContent>
        <ModalHeader>
          <img src={warning} alt="warning" />
          <CloseButton onClick={close} />
        </ModalHeader>
        <div>
          {error ? (
            <div>Error loading penalty data</div>
          ) : !penaltyInfo || !penaltyInfo.Penalties.length ? (
            <S.NullBox>저장된 패널티가 없습니다.</S.NullBox>
          ) : (
            <>
              <S.Title>
                {userName} 님의&nbsp;
                <div style={{ color: theme.color.negative }}>패널티</div>
                &nbsp;횟수
              </S.Title>
              <S.PenaltyCount className="modal-penalty">
                {penaltyInfo?.penaltyCount}회
              </S.PenaltyCount>
              <S.Line />
              {penaltyInfo.Penalties.map((penalty: PenaltyProps) => {
                return (
                  <PenaltyBox
                    key={penalty.penaltyId}
                    reason={penalty.penaltyDescription}
                    date={formatDateTime(penalty.time)}
                  />
                );
              })}
            </>
          )}
        </div>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalPenalty;
