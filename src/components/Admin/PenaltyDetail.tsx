import {
  deletePenaltyApi,
  patchPenaltyApi,
} from '@/api/admin/penalty/modifyPenalty';
import React, { useEffect, useRef, useState } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import Button from '@/components/Admin/Button';

interface PenaltyDetailProps {
  penaltyData: {
    penaltyId: number;
    penaltyDescription: string;
    time: string;
  };
  onEdit: (penaltyId: number, updatedDescription: string) => void;
  onDelete: (penaltyId: number) => void;
}

const PenaltyDetail: React.FC<PenaltyDetailProps> = ({
  penaltyData,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(
    penaltyData.penaltyDescription,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const handleDelete = async () => {
    if (!penaltyData.penaltyId) {
      alert('PenaltyId가 없습니다. 삭제할 수 없습니다.');
      return;
    }

    if (window.confirm('패널티를 삭제하시겠습니까?')) {
      try {
        console.log('penaltyData : ', penaltyData);
        await deletePenaltyApi(penaltyData.penaltyId);
        alert('패널티가 성공적으로 삭제되었습니다.');
        onDelete(penaltyData.penaltyId);
      } catch (error: any) {
        alert(error.message || '패널티 삭제 실패');
        console.error('패널티 삭제 오류:', error);
      }
    }
  };

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      try {
        await patchPenaltyApi(penaltyData.penaltyId, newDescription);
        alert('패널티가 성공적으로 수정되었습니다.');

        onEdit(penaltyData.penaltyId, newDescription);
        setIsEditing(false);
      } catch (error: any) {
        alert(error.message || '패널티 수정 실패');
        console.error('패널티 수정 오류:', error);
      }
    }
  };

  return (
    <S.DetailContainer>
      {isEditing ? (
        <S.Input
          type="text"
          value={newDescription}
          autoFocus
          onChange={(e) => setNewDescription(String(e.target.value))}
          ref={inputRef}
        />
      ) : (
        <S.DetailText>{penaltyData.penaltyDescription}</S.DetailText>
      )}
      <S.DetailText>1</S.DetailText>
      <S.DetailText>{penaltyData.time}</S.DetailText>
      <S.ButtonWrapper ref={buttonRef}>
        <Button
          color="#2f2f2f"
          description={isEditing ? '저장' : '수정'}
          width="64px"
          onClick={handleEdit}
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
