import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ModalContent = styled.div`
  width: 360px;
  background: ${theme.color.grayScale.gray20};
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.div`
  padding: 19px 0px;
  border-bottom: 1px solid #444;
  font-size: 12px;
  font-family: ${theme.font.family.pretendard_regular};
`;

const Item = styled.div`
  padding: 19px 0px;
  color: ${theme.color.main.pointBlue};
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid #444;
  }
  font-family: ${theme.font.family.pretendard_semiBold};
  &:hover {
    background: ${theme.color.grayScale.gray30};
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
  background: ${theme.color.grayScale.gray30};
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const EditDelModal = ({ title, onClickEdit, onClickDel, onClickCancle }) => {
  return (
    <ContentWrapper>
      <ModalContent>
        <Title>{title}메뉴</Title>
        <Item onClick={onClickEdit}>수정</Item>
        <Item onClick={onClickDel}>삭제</Item>
      </ModalContent>
      <CancelButton onClick={onClickCancle}>취소</CancelButton>
    </ContentWrapper>
  );
};

EditDelModal.propTypes = {
  title: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDel: PropTypes.func.isRequired,
  onClickCancle: PropTypes.func.isRequired,
};

export default EditDelModal;
