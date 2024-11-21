/* eslint-disable no-console */
/* eslint-disable no-alert */
import Modal from 'react-modal';

import { deleteEvent } from '@/api/EventAdminAPI';
import UserAPI from '@/api/UserAPI';
import { UserContext } from '@/api/UserContext';
import Header from '@/components/Header/Header';
import EditDelModal from '@/components/Modal/EditDelModal';
import { EventDetailData } from '@/pages/EventDetails';
import * as S from '@/styles/calendar/EventDetailTitle.styled';
import { adminModalStyles } from '@/styles/calendar/EventDetailTitle.styled';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const EventTitle = ({
  data,
  isMeeting,
}: {
  data: EventDetailData;
  isMeeting: boolean;
}) => {
  const { userData } = useContext(UserContext);
  const [adminModalIsOpen, setAdminModalIsOpen] = useState(false);
  const navi = useNavigate();
  const splittedDate = data.createdAt.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const splittedTime = splittedDate[1].substr(0, 5);

  const openAdminModal = () => {
    setAdminModalIsOpen(true);
  };
  const closeAdminModal = () => {
    setAdminModalIsOpen(false);
  };

  const onClickDel = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        await deleteEvent(data.id);
        alert('삭제가 완료되었습니다.');
        navi('/calendar');
      } catch (err) {
        alert('삭제 중 오류가 발생했습니다.');
        console.error(err);
      }
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <S.EventTitleWrapper>
      <UserAPI />
      <Header
        isAccessible={userData.role === 'ADMIN' && !isMeeting}
        onClickRightButton={openAdminModal}
        RightButtonType="MenuButton"
      />
      <S.Title>{data.title}</S.Title>
      <S.WriteInfo>
        <S.Writer>{data.name}</S.Writer>
        <S.WrittenTime>
          {splittedDate[0].replace(/-/gi, '/')} {splittedTime}
        </S.WrittenTime>
      </S.WriteInfo>

      <Modal
        className="calendar-modal"
        isOpen={adminModalIsOpen}
        onRequestClose={closeAdminModal}
        style={adminModalStyles}
      >
        <EditDelModal
          title="일정"
          onClickEdit={() => {
            navi(`/event/${data.id}/edit`);
          }}
          onClickDel={onClickDel}
          onClickCancel={closeAdminModal}
        />
      </Modal>
    </S.EventTitleWrapper>
  );
};

export default EventTitle;
