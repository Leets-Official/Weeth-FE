import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LeftButton from '../Header/LeftButton';
import IndexButton from '../Header/IndexButton';
import Title from '../Header/Title';
// import { UserContext } from '../../hooks/UserContext';
import theme from '../../styles/theme';
import Utils from '../../hooks/Utils';

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

const NoticeHeader = ({ id, onMenuClick, showModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(showModal);
  const navigate = useNavigate();

  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal]);

  const handleIndexButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(
          `http://13.125.78.31:8080/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            params: {
              userId: localStorage.getItem('userId'),
            },
          },
        );

        const validatedResponse = await Utils(
          response,
          axios.delete,
          [
            `http://13.125.78.31:8080/posts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
              params: { userId: localStorage.getItem('userId') },
            },
          ],
          navigate,
        );

        if (validatedResponse.status === 200) {
          alert('삭제되었습니다.');
          onMenuClick('delete');
          setIsModalOpen(false);
          navigate('/board');
        } else {
          console.error('삭제 실패:', validatedResponse.status);
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (err) {
        console.error('삭제 오류:', err);
        alert('삭제 도중 오류가 발생했습니다. 다시 시도해주세요.');
      }
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
  id: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

export default NoticeHeader;
