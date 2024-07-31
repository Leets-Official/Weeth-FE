import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import LeftButton from '../Header/LeftButton';
import IndexButton from '../Header/IndexButton';
import Title from '../Header/Title';
// import { UserContext } from '../../hooks/UserContext';
import theme from '../../styles/theme';
// import Utils from '../../hooks/Utils';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div``;

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
  width: 360px;
  background: #333333;
  border-radius: 10px;
  padding: 10px 0;
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

const NoticeHeader = ({ onMenuClick, showModal, handleDeleteClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(showModal);

  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal]);

  const handleIndexButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                  target.style.backgroundColor = '#4d4d4d';
                  onMenuClick('edit');
                  setTimeout(() => {
                    target.style.backgroundColor = '';
                  }, 100);
                }}
              >
                수정
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = '#4d4d4d';
                  setTimeout(() => {
                    handleDeleteClick();
                    target.style.backgroundColor = '';
                  }, 100);
                }}
              >
                삭제
              </MenuItem>
            </ModalContent>
            <CancelButton onClick={handleCloseModal}>취소</CancelButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

NoticeHeader.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default NoticeHeader;
