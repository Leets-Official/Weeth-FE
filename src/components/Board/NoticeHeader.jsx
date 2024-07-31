import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from '../Header/LeftButton';
import IndexButton from '../Header/IndexButton';
import Title from '../Header/Title';
// import theme from '../../styles/theme';
import EditDelModal from '../EditDelModal';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div``;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// `;

// const ModalContent = styled.div`
//   width: 360px;
//   background: #333333;
//   border-radius: 10px;
//   padding: 10px 0;
//   text-align: center;
// `;

// const MenuTitle = styled.div`
//   font-family: ${theme.font.family.pretendard_regular};
//   padding: 10px 0;
//   color: #fff;
//   cursor: default;
//   border-bottom: 1px solid #444;
// `;

// const MenuItem = styled.div`
//   padding: 15px 0;
//   color: #4886f4;
//   cursor: pointer;
//   &:not(:last-child) {
//     border-bottom: 1px solid #444;
//   }
// `;

// const CancelButton = styled.div`
//   background: #4d4d4d;
//   border-radius: 10px;
//   padding: 15px 0;
//   width: 250px;
//   text-align: center;
//   color: #ffffff;
//   cursor: pointer;
// `;

const NoticeHeader = ({ onMenuClick, showModal }) => {
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

  /* const handleMenuClickInternal = (action) => {
    onMenuClick(action); // 여기에서 onMenuClick을 호출합니다.
    setIsModalOpen(false);
  }; */

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
        <EditDelModal
          title="글"
          onClickEdit={() => onMenuClick('edit')}
          onClickDel={() => onMenuClick('delete')}
          onClickCancel={handleCloseModal}
        />
      )}
    </>
  );
};

NoticeHeader.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

export default NoticeHeader;
