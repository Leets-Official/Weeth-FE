import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Button/Button';
import theme from '@/styles/theme';
import CommonCardinalModal from './CommonCardinalModal';

interface CardinalChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  top?: string;
  left?: string;
  position?: 'center' | 'absolute' | 'fixed';
  overlayColor?: string;
}

const ModalContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  box-sizing: border-box;
  width: calc(100% - 40px);
  max-width: 360px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: ${theme.color.negative};
  font-size: 14px;
`;

const NumInput = styled.input`
  flex: 2;
  max-width: 65%;
  font-family: ${theme.font.semiBold};
  border: 1px solid #dedede;
  border-radius: 4px;
  font-size: 16px;
  padding: 12px;

  &::placeholder {
    color: ${theme.color.gray[65]};
  }
`;

const CustomInput = styled.input`
  flex: 1;
  max-width: 35%;
  font-family: ${theme.font.semiBold};
  border: 1px solid #dedede;
  border-radius: 4px;
  font-size: 16px;
  padding: 12px;
  &::placeholder {
    color: ${theme.color.gray[65]};
  }
`;
const CardinalChangeModal: React.FC<CardinalChangeModalProps> = ({
  isOpen,
  onClose,
  top = '100px',
  left = '50%',
  position = 'absolute',
  overlayColor = 'transparent',
}) => {
  const [cardinalNumber, setCardinalNumber] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!cardinalNumber && !customInput) {
      setError('기수를 입력해주세요.');
      return;
    }
    setError('');
    alert(`새로운 기수: ${customInput || cardinalNumber}`);
    onClose();
  };

  return (
    <CommonCardinalModal
      isOpen={isOpen}
      onClose={onClose}
      title="기수 변경"
      width="400px"
      height="auto"
      top={top}
      left={left}
      position={position}
      overlayColor={overlayColor}
      showCloseButton={false}
      borderBottom
      footer={
        <FooterWrapper>
          <Button
            width="80px"
            height="45px"
            borderRadius="4px"
            color="#2f2f2f"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            width="70px"
            height="45px"
            color="#2f2f2f"
            borderRadius="4px"
            onClick={handleSave}
          >
            저장
          </Button>
        </FooterWrapper>
      }
    >
      <ModalContentWrapper>
        <InputGroup>
          <NumInput
            type="text"
            placeholder="숫자만 입력"
            value={cardinalNumber}
            onChange={(e) => setCardinalNumber(e.target.value)}
          />
          <CustomInput
            type="text"
            placeholder="직접 입력"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
          />
        </InputGroup>
        <ErrorMessage>
          *저장되지 않은 숫자는 새로운 기수로 추가됩니다.
        </ErrorMessage>
      </ModalContentWrapper>
    </CommonCardinalModal>
  );
};

export default CardinalChangeModal;
