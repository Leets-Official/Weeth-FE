import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/service/UserContext';
import LeftButton from '@/components/Header/LeftButton';
import IndexButton from '@/components/Header/IndexButton';
import theme from '@/styles/theme';
import EditDelModal from '@/components/EditDelModal';
import UserAPI from '@/service/UserAPI';

Modal.setAppElement('#root');

interface EventDetailTitleProps {
  id: number;
  text: string;
  writer: string;
  createdAt: string;
  isMeeting: boolean;
}

const StyledTitle = styled.div`
  margin: 25px 25px 20px 25px; //기본 헤더 마진
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 24px;
  padding: 10px 0px;
`;

const Writer = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  color: #a6a6a6;
`;

const WrittenTime = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  color: #a6a6a6;
`;

const Detail = styled.div`
  display: flex;

  div {
    margin-right: 10px;
  }
`;

const adminModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
};

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
    <StyledTitle>
      <UserAPI />
      <StyledHeader>
        <LeftButton />
        {userData.role === 'ADMIN' && !isMeeting ? (
          <IndexButton onClick={openAdminModal} />
        ) : null}
      </StyledHeader>
      <Title>{text}</Title>
      <Detail>
        <Writer>{writer}</Writer>
        <WrittenTime>
          {splittedDate[0].replace(/-/gi, '/')} {splittedTime}
        </WrittenTime>
      </Detail>

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
    </StyledTitle>
  );
};

export default EventDetailTitle;
