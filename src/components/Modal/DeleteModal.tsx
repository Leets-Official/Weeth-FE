import Modal from '@/components/common/Modal';
import styled from 'styled-components';
import theme from '@/styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  margin-left: 4px;
`;
const Title = styled.div`
  font-size: 16px;
  font-family: ${theme.font.regular};
  font-weight: 600;
  margin-top: 15px;
`;

const Description = styled.div`
  font-size: 14px;
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.regular};
  font-weight: 500;
  margin-top: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 9px;
`;

const ModalButton = styled.button`
  font-family: ${theme.font.semiBold};
  color: white;
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
  &:hover {
    opacity: 0.7;
  }
`;

const DelButton = styled(ModalButton)`
  background: ${theme.color.negative};
  &:hover {
    background: ${theme.color.negativeDark};
    color: ${theme.color.gray[30]};
  }
`;
const DeleteModal = ({
  title,
  content,
  onClose,
  onDelete,
}: {
  title: string;
  content: string;
  onClose: () => void;
  onDelete?: () => void;
}) => {
  return (
    <Modal isDelete hasCloseButton={false} onClose={onClose}>
      <Container>
        <Title>{title}</Title>
        <Description>{content}</Description>
      </Container>
      <ButtonContainer>
        <CancelButton onClick={onClose}>취소</CancelButton>
        <DelButton onClick={onDelete}>삭제</DelButton>
      </ButtonContainer>
    </Modal>
  );
};

export default DeleteModal;
