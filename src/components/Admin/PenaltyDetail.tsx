import { deletePenaltyApi } from '@/api/admin/penalty/modifyPenalty';
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
  onDelete: (penaltyId: number) => void;
}

const PenaltyDetail: React.FC<PenaltyDetailProps> = ({
  penaltyData,
  onDelete,
  onEdit,
}) => {
  const handleDelete = async () => {
    if (window.confirm('패널티를 삭제하시겠습니까?')) {
      try {
        await deletePenaltyApi(penaltyData.penaltyId);
        alert('패널티가 성공적으로 삭제되었습니다.');
        onDelete(penaltyData.penaltyId);
      } catch (error: any) {
        alert(error.message || '패널티 삭제 실패');
        console.error('패널티 삭제 오류:', error);
      }
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
