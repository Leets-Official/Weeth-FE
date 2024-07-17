import styled from 'styled-components';
import Modal from 'react-modal';
import React, { useState } from 'react';

import RightButton from '../Header/RightButton';
import LeftButton from '../Header/LeftButton';

Modal.setAppElement('#root');

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DatePicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <LeftButton />
      <DatePicker>
        <h2>
          {todayYear}년 {todayMonth}월
        </h2>
        <button type="button" onClick={openDateModal}>
          ▼
        </button>
      </DatePicker>
      <RightButton text="⋮" />

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
