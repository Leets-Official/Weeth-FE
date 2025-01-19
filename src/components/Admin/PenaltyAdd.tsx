import { useState, useEffect } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import Button from './Button';

interface PenaltyAddProps {
  onCancel: () => void;
  onSave: (data: {
    reason: string;
    penalty: string;
    penaltyDate: string;
  }) => void;
  existingData?: { reason: string; penalty: string; penaltyDate: string };
}

const PenaltyAdd: React.FC<PenaltyAddProps> = ({
  onCancel,
  onSave,
  existingData,
}) => {
  const [reason, setReason] = useState('');
  const [penalty, setPenalty] = useState('');
  const [penaltyDate, setPenaltyDate] = useState('');

  useEffect(() => {
    if (existingData) {
      setReason(existingData.reason);
      setPenalty(existingData.penalty);
      setPenaltyDate(existingData.penaltyDate);
    }
  }, [existingData]);

  const handleSave = () => {
    if (!reason || !penalty || !penaltyDate) {
      alert('모든 필드를 작성해주세요.');
      return;
    }
    onSave({ reason, penalty, penaltyDate });
    setReason('');
    setPenalty('');
    setPenaltyDate('');
  };

  return (
    <S.AddContainer>
      <S.Input
        type="text"
        data-area="reason"
        placeholder="추가할 패널티의 사유를 작성해주세요"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <S.Input
        type="text"
        data-area="penalty"
        value={penalty}
        onChange={(e) => setPenalty(e.target.value)}
      />
      <S.Input
        type="text"
        data-area="penaltyDate"
        value={penaltyDate}
        onChange={(e) => setPenaltyDate(e.target.value)}
      />
      <div style={{ gridArea: 'empty' }} />
      <S.ButtonWrapper>
        <Button
          color="#4d4d4d"
          description="취소"
          width="64px"
          onClick={onCancel}
        />
        <Button
          color="#508fff"
          description="저장"
          width="64px"
          onClick={handleSave}
        />
      </S.ButtonWrapper>
    </S.AddContainer>
  );
};

export default PenaltyAdd;
