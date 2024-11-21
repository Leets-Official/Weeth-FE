import { UserContext } from '@/api/UserContext';
import ModalMonthContent from '@/components/Calendar/ModalMonthContent';
import { monthModalStyles } from '@/styles/calendar/CalendarHeader.styled';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';

import Header from '../Header/Header';

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
