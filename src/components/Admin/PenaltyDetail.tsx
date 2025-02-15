import React from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import Button from './Button';

interface PenaltyDetailProps {
  penaltyData: {
    penaltyId: number;
    penalty: string;
    penaltyDescription: string;
    time: string;
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

  return (
    <S.DetailContainer>
      <S.DetailText>{penaltyData.penaltyDescription}</S.DetailText>
      <S.DetailText>{penaltyData.penalty}</S.DetailText>
      <S.DetailText>{penaltyData.time}</S.DetailText>
      <S.ButtonWrapper>
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
      </S.ButtonWrapper>
    </S.DetailContainer>
  );
};

export default PenaltyDetail;
