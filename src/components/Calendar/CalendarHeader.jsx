import styled from 'styled-components';
import Modal from 'react-modal';
import React, { useState } from 'react';
import theme from '../../styles/theme';

import IndexButton from '../Header/IndexButton';
import LeftButton from '../Header/LeftButton';
import ModalContent from './ModalContent';
import TextButton from '../Header/TextButton';

import under from '../../assets/images/_.png';

Modal.setAppElement('#root');

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진

  .guide-sidebar {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.div`
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px;
  cursor: pointer;
`;

const ButttonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(31,31,31,0.5)',
    backdropFilter: 'blur(2px)',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '45px auto',
  },
  nonBlurArea: {
    width: '100%',
    height: '45px',
    backgroundColor: 'transparent',
  },
  blurArea: {
    backdropFilter: 'blur(2px)',
    width: '100%',
    height: 'calc(100% - 45px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebar: {
    display: 'none', // pc에서 모달 영역 테두리 제거
  },
};

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;

const onClickLeftButton = () => {};
const onClickIndexButton = () => {};

const Header = () => {
  const [dateModalIsOpen, setDateModalIsOpen] = useState(false);

  const openDateModal = () => {
    setDateModalIsOpen(true);
  };
  const closeDateModal = () => {
    setDateModalIsOpen(false);
  };

  const onClickTextButton = () => {
    closeDateModal();
  };

  return (
    <StyledHeader>
      <LeftButton onClick={onClickLeftButton} />
      <TitleWrapper>
        <Title>
          {todayYear}년 {todayMonth}월
        </Title>
        <ImgButton onClick={openDateModal}>
          <img src={under} alt="select" />
        </ImgButton>
      </TitleWrapper>
      {dateModalIsOpen ? null : <IndexButton onClick={onClickIndexButton} />}

      <Modal
        className="calendar-modal"
        isOpen={dateModalIsOpen}
        onRequestClose={closeDateModal}
        style={modalStyles}
      >
        <ButttonWrapper>
          <TextButton text="완료" color="green" onClick={onClickTextButton} />
        </ButttonWrapper>
        <ModalContent origYear={2024} origMonth={7} />
      </Modal>
    </StyledHeader>
  );
};

export default Header;
