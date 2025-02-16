import React, { useState } from 'react';
import Button from '@/components/Button/Button';
import * as S from '@/styles/admin/cardinal/AdminCardinal.styled';
import CommonCardinalModal from '@/components/Admin/Modal/CommonCardinalModal';
import DirectCardinalDropdown from '../DirectCardinal';

interface CardinalChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  top?: string;
  left?: string;
  position?: 'center' | 'absolute' | 'fixed';
  overlayColor?: string;
}

const CardinalEditModal: React.FC<CardinalChangeModalProps> = ({
  isOpen,
  onClose,
  top = '100px',
  left = '50%',
  position = 'absolute',
  overlayColor = 'transparent',
}) => {
  const [cardinalNumber, setCardinalNumber] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [, setError] = useState('');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);

  const handleSave = () => {
    const inputValue = customInput || cardinalNumber;
    if (!inputValue.trim()) {
      setError('기수를 입력해주세요.');
      return;
    }
    setError('');
    alert(`새로운 기수: ${inputValue}`);
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
        <S.FooterWrapper>
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
        </S.FooterWrapper>
      }
    >
      <S.ModalContentWrapper>
        <S.InputGroup>
          <S.StyledInput
            type="text"
            placeholder="숫자만 입력"
            value={cardinalNumber}
            onChange={(e) => setCardinalNumber(e.target.value)}
            flex={2}
            maxWidth="65%"
          />
          <DirectCardinalDropdown
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={setSelectedCardinal}
          />
        </S.InputGroup>
        <S.ErrorMessage>
          *저장되지 않은 숫자는 새로운 기수로 추가됩니다.
        </S.ErrorMessage>
      </S.ModalContentWrapper>
    </CommonCardinalModal>
  );
};

export default CardinalEditModal;
