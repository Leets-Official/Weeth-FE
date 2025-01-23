import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Button/Button';
import CheckBox from '@/assets/images/ic_admin_checkbox.svg';
import UnCheckBox from '@/assets/images/ic_admin_uncheckbox.svg';
import theme from '@/styles/theme';
import CommonCardinalModal from './CommonCardinalModal';

interface CardinalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  outline: none;
  text-align: right;

  :focus::placeholder {
    color: transparent;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #000;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 20px;
`;

const SvgText = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CardinalModal: React.FC<CardinalModalProps> = ({ isOpen, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxClick = () => {
    setIsChecked((prev) => !prev);
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
        <Button width="60px" height="48px" color="#323232" borderRadius="4px">
          저장
        </Button>
      }
    >
      <ModalContentWrapper>
        <Title>추가할 새로운 기수를 작성해주세요</Title>
        <Input type="text" placeholder="기" />
        <div>활동 시기</div>
        <FlexRow>
          <Input type="text" placeholder="년" />
          <Input type="text" placeholder="학기" />
        </FlexRow>
        <SvgText onClick={handleCheckBoxClick}>
          <img
            src={isChecked ? CheckBox : UnCheckBox}
            alt={isChecked ? 'checked' : 'unchecked'}
          />
          <div> 현재 진행 중 </div>
        </SvgText>
      </ModalContentWrapper>
    </CommonCardinalModal>
  );
};

export default CardinalModal;
