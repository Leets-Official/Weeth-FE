/* eslint-disable no-console */
import { deleteEvent } from '@/api/EventAdminAPI';
import Header from '@/components/Header/Header';
import formatDateTime from '@/hooks/formatDateTime';
import { EventDetailData } from '@/pages/EventDetail';
import * as S from '@/styles/calendar/EventDetailTitle.styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tag from '@/components/Event/Tag';
import MenuModal from '@/components/common/MenuModal';
import SelectModal from '../Modal/DeleteModal';
import { toastSuccess, toastError } from '../common/ToastMessage';

const EventTitle = ({
  data,
  isAdmin,
}: {
  data: EventDetailData;
  isAdmin: boolean;
}) => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const navigate = useNavigate();
  const formattedDateTime = formatDateTime(data.createdAt);

  const { id, type } = useParams();

  const handleDelete = async () => {
    try {
      await deleteEvent(data.id);
      toastSuccess('삭제가 완료되었습니다.');
      navigate('/calendar');
    } catch (err) {
      toastError('삭제 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsSelectModalOpen(false);
    }
  };

  return (
    <>
      <Header
        isAccessible={isAdmin}
        onClickRightButton={() => {
          console.log('Right button clicked!');
          setIsMenuModalOpen(true);
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

        {isMenuModalOpen && (
          <MenuModal onClose={() => setIsMenuModalOpen(false)}>
            <S.TextButton onClick={() => navigate(`/${type}/${id}/edit`)}>
              수정
            </S.TextButton>
            <S.TextButton
              $isLast
              onClick={() => {
                setIsMenuModalOpen(false);
                setIsSelectModalOpen(true);
              }}
            >
              삭제
            </S.TextButton>
          </MenuModal>
        )}

        {isSelectModalOpen && (
          <SelectModal
            type="positive"
            title="일정 삭제"
            content="정말 삭제하시겠습니까?"
            onClose={() => setIsSelectModalOpen(false)}
            onDelete={handleDelete}
          />
        )}
      </S.EventTitleWrapper>
    </>
  );
};

export default EventTitle;
