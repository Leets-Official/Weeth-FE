import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { MemberData } from './context/MemberContext';

const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 70px 1fr;
  grid-template-areas: 'reason empty penalty penaltyDate actions';
  gap: 10px;
  padding-left: 70px;
  background-color: #ffffff;
  align-items: center;
  box-sizing: border-box;
`;

const DetailText = styled.div`
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: flex-end;
`;
interface PenaltyDetailProps {
  member: MemberData;
  penaltyData: {
    reason: string;
    penalty: string;
    penaltyDate: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const PenaltyDetail: React.FC<PenaltyDetailProps> = ({
  penaltyData,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      onDelete();
    }
  };

  if (!penaltyData) {
    return <DetailContainer>패널티를 받은 이력이 없습니다.</DetailContainer>;
  }

  return (
    <DetailContainer>
      <DetailText>{penaltyData.reason}</DetailText>
      <DetailText>{penaltyData.penalty}</DetailText>
      <DetailText>{penaltyData.penaltyDate}</DetailText>
      <ButtonWrapper>
        <Button
          color="#2f2f2f"
          description="수정"
          width="64px"
          onClick={onEdit}
        />
        <Button
          color="#ff5858"
          description="삭제"
          width="64px"
          onClick={handleDelete}
        />
      </ButtonWrapper>
    </DetailContainer>
  );
};

export default PenaltyDetail;
