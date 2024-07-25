import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from '../Header/LeftButton';
import IndexButton from '../Header/IndexButton';
// import TextButton from '../Header/TextButton';
import Title from '../Header/Title';
import theme from '../../styles/theme';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

/*
오른쪽 버튼이 없어서 정렬이 안 맞을 경우에는
TitleWrapper 스타일 사용~!
*/
const TitleWrapper = styled.div`
  // position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ModalContent = styled.div`
  background: #333;
  border-radius: 10px;
  padding: 10px 0;
  width: 250px;
  text-align: center;
`;

const MenuTitle = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  padding: 10px 0;
  color: #fff;
  cursor: default;
  border-bottom: 1px solid #444;
`;

const MenuItem = styled.div`
  padding: 15px 0;
  color: #00dda8;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid #444;
  }
`;

const CancelButton = styled.div`
  background: #333;
  border-radius: 10px;
  padding: 15px 0;
  width: 250px;
  text-align: center;
  color: #fff;
  cursor: pointer;
`;

const NoticeHeader = ({ onMenuClick, showModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIndexButtonClick = () => {
    if (showModal) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      onMenuClick('delete');
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <StyledHeader>
        <LeftButton />
        <TitleWrapper>
          <Title text="게시판" />
        </TitleWrapper>
        <IndexButton onClick={handleIndexButtonClick} />
      </StyledHeader>
      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalContent>
              <MenuTitle>글메뉴</MenuTitle>
              <MenuItem onClick={() => onMenuClick('edit')}>수정</MenuItem>
              <MenuItem onClick={handleDeleteClick}>삭제</MenuItem>
            </ModalContent>
            <CancelButton onClick={handleCloseModal}>취소</CancelButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

NoticeHeader.propTypes = {
  onMenuClick: PropTypes.func,
  showModal: PropTypes.bool,
};

NoticeHeader.defaultProps = {
  onMenuClick: () => {},
  showModal: false,
};

export default NoticeHeader;
