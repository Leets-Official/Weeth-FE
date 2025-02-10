import Modal from '@/components/common/Modal';
import styled from 'styled-components';
import theme from '@/styles/theme';

// 스타일드 컴포넌트 정의
const Title = styled.div`
  font-size: 16px;
`;

const Description = styled.div`
  font-size: 14px;
  color: ${theme.color.gray[65]};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ModalButton = styled.button`
  font-family: ${theme.font.semiBold};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 148px;
  height: 45px;
`;

const CancelButton = styled(ModalButton)`
  background: ${theme.color.gray[30]};
`;

const DelButton = styled(ModalButton)`
  background: ${theme.color.negative};
  &:hover {
    background: ${theme.color.negativeDark};
    color: ${theme.color.gray[30]};
  }
`;
// DeleteModal 컴포넌트 정의
const DeleteModal = ({
  title,
  content,
  onClose,
}: {
  title: string;
  content: string;
  onClose: () => void;
}) => {
  return (
    <Modal hasCloseButton={false} onClose={onClose}>
      <Title>{title}</Title>
      <Description>{content}</Description>
      <ButtonContainer>
        <CancelButton>취소</CancelButton>
        <DelButton>삭제</DelButton>
      </ButtonContainer>
    </Modal>
  );
};

export default DeleteModal;
