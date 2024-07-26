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
  widht: 360px;
  background: #333333;
  border-radius: 10px;
  padding: 10px 0;
  width: 360px;
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
  color: #4886f4;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid #444;
  }
`;

const CancelButton = styled.div`
  background: #4d4d4d;
  border-radius: 10px;
  padding: 15px 0;
  width: 250px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;

const NoticeHeader = ({ onMenuClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIndexButtonClick = () => {
    setIsModalOpen(true);
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
              <MenuItem
                onClick={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = '#4d4d4d'; // 클릭 시 색상 변경
                  onMenuClick('edit');
                  setTimeout(() => {
                    target.style.backgroundColor = ''; // 원래 색상으로 돌아옴
                  }, 100); // 2초 후 원래 색상으로 돌아옴
                }}
              >
                수정
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = '#4d4d4d'; // 클릭 시 색상 변
                  setTimeout(() => {
                    handleDeleteClick();
                    target.style.backgroundColor = ''; // 원래 색상으로 돌아옴
                  }, 100); // 0.3초 후 원래 색상으로 돌아옴
                }}
              >
                삭제
              </MenuItem>
            </ModalContent>
            <CancelButton
              onClick={() => {
                handleCloseModal();
              }}
            >
              취소
            </CancelButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

NoticeHeader.propTypes = {
  onMenuClick: PropTypes.func,
};

NoticeHeader.defaultProps = {
  onMenuClick: () => {},
};

export default NoticeHeader;
