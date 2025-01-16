import theme from '@/styles/theme';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { MemberData } from './context/MemberContext';

const AddContainer = styled.div`
  background-color: ${theme.color.gray[100]};
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  width: 100%;
  max-width: 300px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  outline: none;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
interface PenaltyAddProps {
  member: MemberData;
  onCancel: () => void;
}

const PenaltyAdd: React.FC<PenaltyAddProps> = ({ member, onCancel }) => {
  const [reason, setReason] = useState('');
  const [penalty, setPenalty] = useState('');
  const [penaltyDate, setPenaltyDate] = useState('');

  const handleSave = () => {
    console.log('Saved:', { reason, penalty, penaltyDate });
    onCancel();
  };

  return (
    <AddContainer>
      <Input
        type="text"
        placeholder="추가할 패널티의 사유를 작성해주세요"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Input
        type="text"
        value={penalty}
        onChange={(e) => setPenalty(e.target.value)}
      />
      <Input
        type="text"
        value={penaltyDate}
        onChange={(e) => setPenaltyDate(e.target.value)}
      />
      <ButtonWrapper>
        <Button
          color="#4d4d4d"
          description="취소"
          width="64px"
          //   onClick={onCancel}
        />
        <Button
          color="#508fff"
          description="저장"
          width="64px"
          //   onClick={handleSave}
        />
      </ButtonWrapper>
    </AddContainer>
  );
};

export default PenaltyAdd;
