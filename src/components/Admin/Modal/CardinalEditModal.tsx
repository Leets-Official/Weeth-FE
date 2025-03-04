import React, { useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import * as S from '@/styles/admin/cardinal/CardinalModal.styled';
import CommonCardinalModal from '@/components/Admin/Modal/CommonCardinalModal';
import DirectCardinalDropdown from '@/components/Admin/DirectCardinal';
import { continueNextCardinalApi } from '@/api/admin/member/patchUserManagement';
import useGetAllCardinals from '@/api/useGetCardinals';

interface CardinalChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUserIds: number[];
  top?: string;
  left?: string;
  position?: 'center' | 'absolute' | 'fixed';
  overlayColor?: string;
}

const CardinalEditModal: React.FC<CardinalChangeModalProps> = ({
  isOpen,
  onClose,
  selectedUserIds,
  top = '100px',
  left = '50%',
  position = 'absolute',
  overlayColor = 'transparent',
}) => {
  const [cardinalNumber, setCardinalNumber] = useState('');
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { allCardinals } = useGetAllCardinals();
  const existingCardinalNumbers = allCardinals.map((c) => c.cardinalNumber);

  const handleSelectCardinal = (value: number, isCustom: boolean) => {
    setIsCustomInput(isCustom);
    if (isCustom) {
      setCardinalNumber('');
      setSelectedCardinal(null);
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setCardinalNumber(String(value));
      setSelectedCardinal(value);
    }
  };

  const handleSave = async () => {
    if (!cardinalNumber.trim()) {
      alert('변경할 기수를 입력해주세요.');
      return;
    }

    try {
      const newCardinalNumber = Number(cardinalNumber);

      const isExistingCardinal =
        existingCardinalNumbers.includes(newCardinalNumber);

      if (isCustomInput && isExistingCardinal) {
        alert('이미 존재하는 기수입니다.');
        return;
      }

      const cardinalData = selectedUserIds.map((id) => ({
        userId: id,
        cardinal: Number(cardinalNumber),
      }));

      const response = await continueNextCardinalApi(cardinalData);

      if (response.code === 200) {
        alert('기수가 성공적으로 변경되었습니다.');
        onClose();
        window.location.reload();
      } else {
        alert(`기수 변경 실패: ${response.message}`);
      }
    } catch (error) {
      console.error('기수 변경 오류: ', error);
      alert(`기수 변경 중 오류가 발생했습니다.`);
    }
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
