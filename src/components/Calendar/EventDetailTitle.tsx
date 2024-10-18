import Modal from 'react-modal';
import axios from 'axios';

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/service/UserContext';
import LeftButton from '@/components/Header/LeftButton';
import IndexButton from '@/components/Header/IndexButton';
import EditDelModal from '@/components/EditDelModal';
import UserAPI from '@/service/UserAPI';
import * as S from '@/styles/calendar/EventDetailTitle.styled';
import { adminModalStyles } from '@/styles/calendar/EventDetailTitle.styled';

Modal.setAppElement('#root');

interface EventDetailTitleProps {
  id: number;
  text: string;
  writer: string;
  createdAt: string;
  isMeeting: boolean;
}

const EventDetailTitle: React.FC<EventDetailTitleProps> = ({ id, text, writer, createdAt, isMeeting }) => {
  const { userData } = useContext(UserContext);
  const [adminModalIsOpen, setAdminModalIsOpen] = useState(false);
  const navi = useNavigate();
  const splittedDate = createdAt.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const splittedTime = splittedDate[1].substr(0, 5);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const openAdminModal = () => {
    setAdminModalIsOpen(true);
  };
  const closeAdminModal = () => {
    setAdminModalIsOpen(false);
  };

  const onClickDel = async () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        await axios.delete(`${BASE_URL}/api/v1/admin/events/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Authorization_refresh: `Bearer ${refreshToken}`,
          },
        });
        alert('삭제가 완료되었습니다.');
        navi('/calendar');
      } catch (err) {
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <S.StyledTitle>
      <UserAPI />
      <S.StyledHeader>
        <LeftButton />
        {userData.role === 'ADMIN' && !isMeeting ? (
          <IndexButton onClick={openAdminModal} />
        ) : null}
      </S.StyledHeader>
      <S.Title>{text}</S.Title>
      <S.Detail>
        <S.Writer>{writer}</S.Writer>
        <S.WrittenTime>
          {splittedDate[0].replace(/-/gi, '/')} {splittedTime}
        </S.WrittenTime>
      </S.Detail>

      <Modal
        className="calendar-modal"
        isOpen={adminModalIsOpen}
        onRequestClose={closeAdminModal}
        style={adminModalStyles}
      >
        <EditDelModal
          title="일정"
          onClickEdit={() => {
            navi(`/event/${id}/edit`);
          }}
          onClickDel={onClickDel}
          onClickCancel={closeAdminModal}
        />
      </Modal>
    </S.StyledTitle>
  );
};

export default EventDetailTitle;
