import React, { useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import * as S from '@/styles/admin/cardinal/AdminCardinal.styled';
import CommonCardinalModal from '@/components/Admin/Modal/CommonCardinalModal';
import DirectCardinalDropdown from '@/components/Admin/DirectCardinal';

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
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [selectedCardinal] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectCardinal = (value: number, isCustom: boolean) => {
    setIsCustomInput(isCustom);
    if (isCustom) {
      setCardinalNumber('');
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setCardinalNumber(String(value));
    }
  };

  const handleSave = () => {
    if (!cardinalNumber.trim()) {
      alert('변경할 기수를 선택해주세요.');
      return;
    }
    alert(`새로운 기수: ${cardinalNumber}`);
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
            readOnly={!isCustomInput}
            ref={inputRef}
          />
          <DirectCardinalDropdown
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={handleSelectCardinal}
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
