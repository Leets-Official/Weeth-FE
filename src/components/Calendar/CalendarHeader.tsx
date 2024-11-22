import { UserContext } from '@/api/UserContext';
import ModalMonthContent from '@/components/Calendar/ModalMonthContent';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';

import Header from '../Header/Header';

Modal.setAppElement('#root');

const monthModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(5px)', // 표준 CSS 속성
    WebkitBackdropFilter: 'blur(5px)', // -webkit- 접두사를 사용한 속성
    zIndex: 1000,
    width: '100%',
    height: '100%',
    top: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '55px auto', // 블러가 시작되는 위치를 정하고
  },
  content: {
    margin: '10px auto', // 모달은 블러 시작점으로부터 10px 떨어진 곳에 위치
  },
};

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
  const { userData } = useContext(UserContext);

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
    <>
      <Header
        isCalendar
        month={month}
        year={year}
        isMonth={isMonth}
        openMonthModal={openMonthModal}
        RightButtonType="PLUS"
        isAdmin={userData?.role === 'ADMIN' && !monthModalIsOpen}
      />
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
    </>
  );
};

export default CalendarHeader;
