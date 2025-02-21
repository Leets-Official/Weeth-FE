import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Button/Button';
import CheckBox from '@/assets/images/ic_admin_checkbox.svg';
import UnCheckBox from '@/assets/images/ic_admin_uncheckbox.svg';
import * as S from '@/styles/admin/cardinal/CardinalModal.styled';
import CommonCardinalModal from '@/components/Admin/Modal/CommonCardinalModal';
import { postCardinalApi } from '@/api/admin/cardinal/postCardinal';
import {
  handleNumericInput,
  preventNonNumeric,
} from '@/utils/admin/handleNumericInput';

interface CardinalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalContentWrapper = styled.div`
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  box-sizing: border-box;
`;

const CardinalModal: React.FC<CardinalModalProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({
    cardinalNumber: '',
    year: '',
    semester: '',
    isChecked: false,
  });

  const handleCheckBoxClick = () => {
    setFormState((prev) => ({
      ...prev,
      isChecked: !prev.isChecked,
    }));
  };

  const handleClick = async () => {
    const { cardinalNumber, year, semester } = formState;

    if (!cardinalNumber || !year || !semester) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await postCardinalApi(
        Number(cardinalNumber),
        Number(year),
        Number(semester),
      );
      console.log('새로운 기수 저장 성공:', response);
      alert('새로운 기수가 저장되었습니다.');
      onClose();
    } catch (error: any) {
      console.error('새로운 기수 저장 실패:', error.message);
      alert(`새로운 기수 저장 실패: ${error.message}`);
    }
  };

  return (
    <CommonCardinalModal
      isOpen={isOpen}
      onClose={onClose}
      width="400px"
      height="auto"
      top="20%"
      left="40%"
      position="absolute"
      overlayColor="rgba(0,0,0,0.5)"
      showCloseButton
      footer={
        <Button
          width="60px"
          height="48px"
          color="#323232"
          borderRadius="4px"
          onClick={handleClick}
        >
          저장
        </Button>
      }
    >
      <ModalContentWrapper>
        <S.Title>새로운 기수 추가</S.Title>
        <li>추가할 새로운 기수를 작성해주세요</li>
        <S.InputWrapper>
          <S.Input
            type="text"
            name="cardinalNumber"
            value={formState.cardinalNumber}
            onChange={(e) => handleNumericInput(e, setFormState, 2)}
            onKeyDown={preventNonNumeric}
          />
          <S.Unit>기</S.Unit>
        </S.InputWrapper>
        <li>활동 시기</li>
        <S.FlexRow>
          <S.InputWrapper>
            <S.Input
              type="text"
              name="year"
              value={formState.year}
              onChange={(e) => handleNumericInput(e, setFormState, 4)}
              onKeyDown={preventNonNumeric}
            />
            <S.Unit>년</S.Unit>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Input
              type="text"
              name="semester"
              value={formState.semester}
              onChange={(e) =>
                handleNumericInput(e, setFormState, 1, ['1', '2'])
              }
              onKeyDown={preventNonNumeric}
            />
            <S.Unit>학기</S.Unit>
          </S.InputWrapper>
        </S.FlexRow>
        <S.SvgText onClick={handleCheckBoxClick}>
          <img
            src={formState.isChecked ? CheckBox : UnCheckBox}
            alt={formState.isChecked ? 'checked' : 'unchecked'}
          />
          <div> 현재 진행 중 </div>
        </S.SvgText>
      </ModalContentWrapper>
    </CommonCardinalModal>
  );
};

export default CardinalModal;
