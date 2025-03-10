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

const ActionButton = styled(ModalButton)<{
  type: 'positive' | 'negative';
  visible: boolean;
}>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  background: ${(props) =>
    props.type === 'positive' ? theme.color.main : theme.color.negative};
  &:hover {
    background: ${(props) =>
      props.type === 'positive'
        ? theme.color.mainDark
        : theme.color.negativeDark};
    color: ${theme.color.gray[30]};
  }
`;
const SelectModal = ({
  title,
  content,
  buttonContent = '삭제',
  onClose,
  onDelete,
  type = 'negative',
  visibility = true,
  cancleText = '취소',
}: {
  title: string;
  content: string;
  buttonContent?: string;
  onClose: () => void;
  onDelete?: () => void;
  type?: 'positive' | 'negative';
  visibility?: boolean;
  cancleText?: string;
}) => {
  return (
    <Modal isDelete hasCloseButton={false} onClose={onClose}>
      <Container>
        <Title>{title}</Title>
        <Description>{content}</Description>
      </Container>
      <ButtonContainer>
        <CancelButton onClick={onClose}>{cancleText}</CancelButton>
        <ActionButton onClick={onDelete} type={type} visible={visibility}>
          {buttonContent}
        </ActionButton>
      </ButtonContainer>
    </Modal>
  );
};

export default SelectModal;
