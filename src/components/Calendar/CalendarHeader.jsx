import styled from 'styled-components';
import Modal from 'react-modal';
import React, { useState } from 'react';

import RightButton from '../Header/RightButton';
import LeftButton from '../Header/LeftButton';

import under from '../../assets/images/_.png';

Modal.setAppElement('#root');

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

const DatePicker = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18pt;
  font-weight: 600;
`;

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 20px;
  background: #4d4d4d;
  color: white;
  border-radius: 10px;
  width: 300px;
  margin: auto;
  position: relative;
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 100px;
`;

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;

const onClickLeftButton = () => {};
const onClickRightButton = () => {};

const Header = () => {
  const [dateModalIsOpen, setDateModalIsOpen] = useState(false);

  const openDateModal = () => {
    setDateModalIsOpen(true);
  };
  const closeDateModal = () => {
    setDateModalIsOpen(false);
  };

  return (
    <StyledHeader>
      <LeftButton onClick={onClickLeftButton} />
      <DatePicker>
        <Title>
          {todayYear}년 {todayMonth}월
        </Title>
        <ImgButton onClick={openDateModal}>
          <img src={under} alt="select" />
        </ImgButton>
      </DatePicker>
      <RightButton onClick={onClickRightButton} />

      <Modal
        className="modal"
        isOpen={dateModalIsOpen}
        onRequestClose={closeDateModal}
      >
        <ModalContent>
          <StyledInput type="text" placeholder="2024" />
          <div>년</div>
          <StyledInput type="text" placeholder="7" />
          <div>월</div>
        </ModalContent>
      </Modal>
    </StyledHeader>
  );
};

export default Header;
