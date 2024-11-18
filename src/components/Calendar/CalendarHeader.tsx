import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import ModalMonthContent from '@/components/Calendar/ModalMonthContent';
import LeftButton from '@/components/Header/LeftButton';
import { UserContext } from '@/api/UserContext';
import * as S from '@/styles/calendar/CalendarHeader.styled';
import { monthModalStyles } from '@/styles/calendar/CalendarHeader.styled';

import icPlus from '@/assets/images/ic_plus.svg';
import under from '@/assets/images/ic_under.svg';

Modal.setAppElement('#root');

interface CalendarHeaderProps {
  month: number;
  year: number;
  isMonth: boolean;
  editYear: (newYear: number) => void;
  editMonth: (newMonth: number) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month,
  year,
  isMonth,
  editYear,
  editMonth,
}) => {
  const [monthModalIsOpen, setMonthModalIsOpen] = useState(false);
  const { userData, error } = useContext(UserContext);
  const navi = useNavigate();

  const openMonthModal = () => {
    setMonthModalIsOpen(true);
  };
  const closeMonthModal = () => {
    setMonthModalIsOpen(false);
  };

  const onClickTextButton = () => {
    closeMonthModal();
  };

  let adminButton;

  // userData를 받아오지 못한 경우 아무것도 렌더링하지 않음
  if (!userData && !error) {
    adminButton = null;
  }
  // 에러가 발생한 경우 아무것도 렌더링하지 않음
  else if (error) {
    adminButton = null;
  }
  // userData를 잘 받아왔고, 해당 user의 role이 ADMIN이라면 어드민 버튼 렌더링
  else if (userData.role === 'ADMIN' && !monthModalIsOpen) {
    adminButton = (
      <S.PlusButton
        src={icPlus}
        alt="+"
        onClick={() => {
          navi('/event/create');
        }}
      />
    );
  }

  return (
    <S.StyledHeader>
      <LeftButton />
      <S.TitleWrapper>
        <S.TitleYear>{year}년</S.TitleYear>
        <S.TitleMonth>{isMonth ? `${month}월` : null}</S.TitleMonth>
        <S.ImgButton onClick={openMonthModal}>
          <img src={under} alt="select" />
        </S.ImgButton>
      </S.TitleWrapper>
      {adminButton}
      <Modal
        className="calendar-modal"
        isOpen={monthModalIsOpen}
        onRequestClose={closeMonthModal}
        style={monthModalStyles}
      >
        <ModalMonthContent
          origYear={year}
          origMonth={month}
          isMonth={isMonth}
          onClickTextButton={onClickTextButton}
          editYear={editYear}
          editMonth={editMonth}
        />
      </Modal>
    </S.StyledHeader>
  );
};

export default CalendarHeader;
