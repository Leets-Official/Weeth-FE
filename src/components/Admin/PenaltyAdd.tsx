import { postPenaltyApi } from '@/api/admin/penalty/getPenalty';
import { useState } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import Button from '@/components/Admin/Button';

interface PenaltyAddProps {
  userId: number;
  onCancel: () => void;
  onSave: (data: {
    penaltyId: number;
    penaltyDescription: string;
    time: string;
  }) => void;
  existingData?: {
    penaltyId?: number;
    penaltyDescription: string;
    time: string;
  };
}

const PenaltyAdd: React.FC<PenaltyAddProps> = ({
  userId,
  onCancel,
  onSave,
  existingData,
}) => {
  const [formData, setFormData] = useState({
    penaltyId: existingData?.penaltyId,
    penaltyDescription: existingData?.penaltyDescription || '',
    time: existingData?.time || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'penalty' ? parseInt(value, 10) || 1 : value,
    }));
  };
  const handleSave = async () => {
    if (!formData.penaltyDescription || !formData.time) {
      alert('모든 필드를 작성해주세요.');
      return;
    }
    try {
      await postPenaltyApi(userId, formData.penaltyDescription); // API 요청
      alert('패널티가 성공적으로 부여되었습니다.');
      onSave({ ...formData, penaltyId: formData.penaltyId ?? 0 });
      setFormData({
        penaltyId: 0,
        penaltyDescription: '',
        time: '',
      });
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
      console.error('패널티 부여 실패:', error);
    }
  };

  const fields = [
    {
      name: 'penaltyDescription',
      placeholder: '추가할 패널티의 사유를 작성해주세요',
    },
    { name: 'penaltyId', placeholder: '' },
    { name: 'time', placeholder: '' },
  ];

  return (
    <S.AddContainer>
      {fields.map((field) => (
        <S.Input
          key={field.name}
          type={field.name === 'penalty' ? 'number' : 'text'}
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
