import styled from 'styled-components';
import Modal from 'react-modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
  sidebar: {
    display: 'none', // pc에서 모달 영역 테두리 제거
  },
};

const onClickLeftButton = () => {};
const onClickIndexButton = () => {};

const CalendarHeader = ({ todayMonth, todayYear, isMonth }) => {
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
          {todayYear}년{isMonth ? null : `${todayMonth}월`}
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
        <ModalContent origYear={todayYear} origMonth={todayMonth} />
      </Modal>
    </StyledHeader>
  );
};

CalendarHeader.propTypes = {
  todayMonth: PropTypes.number.isRequired,
  todayYear: PropTypes.number.isRequired,
  isMonth: PropTypes.bool.isRequired,
};

export default CalendarHeader;
