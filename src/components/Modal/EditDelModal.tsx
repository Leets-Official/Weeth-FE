import theme from '@/styles/theme';
import PropTypes from 'prop-types';
import styled from 'styled-components';

interface EditDelModalProps {
  title: string;
  onClickEdit: () => void;
  onClickDel: () => void;
  onClickCancel: () => void;
}

const ContentWrapper = styled.div`
  position: fixed; // 화면 고정
  top: 200px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // 다른 요소보다 위에 위치하도록 설정
  flex-direction: column;
  gap: 24px;
`;

const ModalContent = styled.div`
  width: 360px;
  background: ${theme.color.gray[20]};
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.div`
  padding: 19px 0px;
  border-bottom: 1px solid #444;
  font-size: 12px;
  font-family: ${theme.font.regular};
`;

const Item = styled.div`
  padding: 19px 0px;
  color: ${theme.color.positive};
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid #444;
  }
  font-family: ${theme.font.semiBold};
  &:hover {
    background: ${theme.color.gray[30]};
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`;

const CancelButton = styled.div`
  width: 315px;
  height: 20px;
  padding: 15px 0;
  background: ${theme.color.gray[30]};
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  font-family: ${theme.font.semiBold};
`;

const EditDelModal: React.FC<EditDelModalProps> = ({
  title,
  onClickEdit,
  onClickDel,
  onClickCancel,
}) => {
  return (
    <ContentWrapper>
      <ModalContent>
        <Title>{title}메뉴</Title>
        <Item onClick={onClickEdit}>수정</Item>
        <Item onClick={onClickDel}>삭제</Item>
      </ModalContent>
      <CancelButton onClick={onClickCancel}>취소</CancelButton>
    </ContentWrapper>
  );
};

EditDelModal.propTypes = {
  title: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDel: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

export default EditDelModal;
