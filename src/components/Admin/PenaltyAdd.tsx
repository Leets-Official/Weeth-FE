import { useState } from 'react';
import theme from '@/styles/theme';
import { styled } from 'styled-components';
import Button from './Button';

const AddContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 70px 1fr;
  grid-template-areas: 'reason empty empty penalty penaltyDate actions';
  gap: 10px;
  padding-left: 70px;
  background-color: ${theme.color.gray[100]};
  align-items: center;
  box-sizing: border-box;
`;

const Input = styled.input`
  font-weight: 500;
  padding: 8px;
  width: 100%;
  max-width: 300px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  outline: none;
`;

const ButtonWrapper = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: flex-end;
`;

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
        data-area="reason"
        placeholder="추가할 패널티의 사유를 작성해주세요"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Input
        type="text"
        data-area="penalty"
        value={penalty}
        onChange={(e) => setPenalty(e.target.value)}
      />
      <Input
        type="text"
        data-area="penaltyDate"
        value={penaltyDate}
        onChange={(e) => setPenaltyDate(e.target.value)}
      />
      <div style={{ gridArea: 'empty' }} />
      <ButtonWrapper>
        <Button
          color="#4d4d4d"
          description="취소"
          width="64px"
          // onClick={onCancel}
        />
        <Button
          color="#508fff"
          description="저장"
          width="64px"
          // onClick={handleSave}
        />
      </ButtonWrapper>
    </AddContainer>
  );
};

export default PenaltyAdd;
