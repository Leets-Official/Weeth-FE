import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { MemberData } from './context/MemberContext';

const AddRow = styled.tr`
  background-color: #f0f9f6;
`;

const AddCell = styled.td`
  padding: 10px;
  white-space: nowrap;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  background-color: transparent;
  border: none;
  font-size: 16px;
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
    <AddRow>
      <AddCell>
        <Input
          type="text"
          placeholder="사유를 입력해주세요"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </AddCell>
      <AddCell>
        <Input
          type="text"
          placeholder="패널티를 입력해주세요"
          value={penalty}
          onChange={(e) => setPenalty(e.target.value)}
        />
      </AddCell>
      <AddCell>
        <Input
          type="date"
          value={penaltyDate}
          onChange={(e) => setPenaltyDate(e.target.value)}
        />
      </AddCell>
      <AddCell>
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
      </AddCell>
    </AddRow>
  );
};

export default PenaltyAdd;
