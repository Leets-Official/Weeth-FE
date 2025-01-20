/* eslint-disable no-console */
/* eslint-disable no-alert */
import Modal from 'react-modal';

import { deleteEvent } from '@/api/EventAdminAPI';
import Header from '@/components/Header/Header';
import EditDelModal from '@/components/Modal/EditDelModal';
import formatDateTime from '@/hooks/formatDateTime';
import { EventDetailData } from '@/pages/EventDetail';
import * as S from '@/styles/calendar/EventDetailTitle.styled';
import { adminModalStyles } from '@/styles/calendar/EventDetailTitle.styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetUserInfo from '@/api/useGetUserInfo';

Modal.setAppElement('#root');

const EventTitle = ({
  data,
  isMeeting,
}: {
  data: EventDetailData;
  isMeeting: boolean;
}) => {
  const { userInfo } = useGetUserInfo();
  const [adminModalIsOpen, setAdminModalIsOpen] = useState(false);
  const navi = useNavigate();
  const formattedDateTime = formatDateTime(data.createdAt);

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

  if (!userInfo) {
    return null;
  }

  return (
    <S.EventTitleWrapper>
      <Header
        isAccessible={userInfo.role === 'ADMIN' && !isMeeting}
        onClickRightButton={openAdminModal}
        RightButtonType="MENU"
      />
      <S.Title>{data.title}</S.Title>
      <S.WriteInfo>
        <S.Writer>{data.name}</S.Writer>
        <S.WrittenTime>{formattedDateTime}</S.WrittenTime>
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
            navi(`/events/${data.id}/edit`);
          }}
          onClickDel={onClickDel}
          onClickCancel={closeAdminModal}
        />
      </Modal>
    </S.EventTitleWrapper>
  );
};

export default EventTitle;
