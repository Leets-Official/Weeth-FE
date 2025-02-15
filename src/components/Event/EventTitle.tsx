/* eslint-disable no-console */
/* eslint-disable no-alert */
import { deleteEvent } from '@/api/EventAdminAPI';
import Header from '@/components/Header/Header';
import formatDateTime from '@/hooks/formatDateTime';
import { EventDetailData } from '@/pages/EventDetail';
import * as S from '@/styles/calendar/EventDetailTitle.styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tag from '@/components/Event/Tag';
import MenuModal from '@/components/common/MenuModal';

const EventTitle = ({
  data,
  isAdmin,
}: {
  data: EventDetailData;
  isAdmin: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const formattedDateTime = formatDateTime(data.createdAt);

  const { id, type } = useParams();

  const onClickDel = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        await deleteEvent(data.id);
        alert('삭제가 완료되었습니다.');
        navigate('/calendar');
      } catch (err) {
        alert('삭제 중 오류가 발생했습니다.');
        console.error(err);
      }
    }
  };

  return (
    <>
      <Header
        isAccessible={isAdmin}
        onClickRightButton={() => {
          console.log('Right button clicked!');

          setIsModalOpen(true);
          console.log(isModalOpen);
        }}
        RightButtonType="MENU"
      />

      <S.EventTitleWrapper>
        <S.SpaceBetween>
          <S.Title>{data.title}</S.Title>
          {type === 'meetings' && <Tag />}
        </S.SpaceBetween>

        <S.SpaceBetween>
          <S.WriteInfo>
            <S.Writer>{data.name}</S.Writer>
            <S.WrittenTime>{formattedDateTime}</S.WrittenTime>
          </S.WriteInfo>
          <S.Cardinal>{data.cardinal}기</S.Cardinal>
        </S.SpaceBetween>

        {isModalOpen && (
          <MenuModal
            onClose={() => {
              setIsModalOpen(false);
            }}
            top={-65}
            right={630}
          >
            <S.TextButton
              onClick={() => {
                navigate(`/${type}/${id}/edit`);
              }}
            >
              수정
            </S.TextButton>
            <S.TextButton
              $isLast
              onClick={() => {
                onClickDel();
              }}
            >
              삭제
            </S.TextButton>
          </MenuModal>
        )}
      </S.EventTitleWrapper>
    </>
  );
};

export default EventTitle;
