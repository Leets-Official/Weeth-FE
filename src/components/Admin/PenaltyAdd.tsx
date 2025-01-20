import { useState } from 'react';
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
  const [formData, setFormData] = useState({
    reason: existingData?.reason || '',
    penalty: existingData?.penalty || '',
    penaltyDate: existingData?.penaltyDate || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.reason || !formData.penalty || !formData.penaltyDate) {
      alert('모든 필드를 작성해주세요.');
      return;
    }
    onSave(formData);
    setFormData({ reason: '', penalty: '', penaltyDate: '' });
  };

  const fields = [
    { name: 'reason', placeholder: '추가할 패널티의 사유를 작성해주세요' },
    { name: 'penalty', placeholder: '' },
    { name: 'penaltyDate', placeholder: '' },
  ];

  return (
    <S.AddContainer>
      {fields.map((field) => (
        <S.Input
          key={field.name}
          type="text"
          name={field.name}
          placeholder={field.placeholder || undefined}
          value={formData[field.name as keyof typeof formData]}
          onChange={handleChange}
        />
      ))}
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
