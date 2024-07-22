import styled from 'styled-components';
import Modal from 'react-modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import theme from '../../styles/theme';
import IndexButton from '../Header/IndexButton';
import LeftButton from '../Header/LeftButton';
import ModalMonthContent from './ModalMonthContent';
import TextButton from '../Header/TextButton';

import under from '../../assets/images/ic_under.svg';

Modal.setAppElement('#root');

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const TitleYear = styled.div`
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
  padding-right: 5px;
`;

const TitleMonth = styled.div`
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
  position: fixed;
  width: 370px;
  top: -41px;
  left: 330px;
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
    width: '100%',
    height: 'calc(100vh - 10px)',
    top: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '75px auto', // 블러가 시작되는 위치를 정하고
  },
  content: {
    margin: '10px auto', // 모달은 블러 시작점으로부터 10px 떨어진 곳에 위치
  },
};

const onClickIndexButton = () => {};

const CalendarHeader = ({ todayMonth, todayYear, isYear }) => {
  const [dateModalIsOpen, setMonthModalIsOpen] = useState(false);

  const openMonthModal = () => {
    setMonthModalIsOpen(true);
  };
  const closeMonthModal = () => {
    setMonthModalIsOpen(false);
  };

  const onClickTextButton = () => {
    closeMonthModal();
  };

  return (
    <StyledHeader>
      <LeftButton />
      <TitleWrapper>
        <TitleYear>{todayYear}년</TitleYear>
        <TitleMonth>{isYear ? null : `${todayMonth}월`}</TitleMonth>
        <ImgButton onClick={openMonthModal}>
          <img src={under} alt="select" />
        </ImgButton>
      </TitleWrapper>
      {dateModalIsOpen ? null : <IndexButton onClick={onClickIndexButton} />}

      <Modal
        className="calendar-modal"
        isOpen={dateModalIsOpen}
        onRequestClose={closeMonthModal}
        style={modalStyles}
      >
        <ButttonWrapper>
          <TextButton
            text="완료"
            color="mainColor"
            onClick={onClickTextButton}
          />
        </ButttonWrapper>
        <ModalMonthContent
          origYear={todayYear}
          origMonth={todayMonth}
          isYear={isYear}
        />
      </Modal>
    </StyledHeader>
  );
};

CalendarHeader.propTypes = {
  todayMonth: PropTypes.number.isRequired,
  todayYear: PropTypes.number.isRequired,
  isYear: PropTypes.bool.isRequired,
};

export default CalendarHeader;
