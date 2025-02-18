import dayjs from 'dayjs';
import icCalendar from '@/assets/images/ic_date.svg';
import { WEEK_DAYS } from '@/constants/dateConstants';
import { EventDetailData } from '@/pages/EventDetail';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/event/EventContent.styled';
import Button from '@/components/Button/Button';
import theme from '@/styles/theme';
import Modal from '@/components/common/Modal';
import { useState } from 'react';
import fullscreen from '@/assets/images/ic_fullscreen.svg';
import smallscreen from '@/assets/images/ic_smallscreen.svg';
import close from '@/assets/images/ic_close.svg';
import { useParams } from 'react-router-dom';

const EventContent = ({
  data,
  isAdmin,
}: {
  data: EventDetailData;
  isAdmin: boolean;
}) => {
  useCustomBack('/calendar');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { type } = useParams();

  const start = dayjs(data.start);
  const end = dayjs(data.end);

  const isOneday = start.isSame(end, 'day');

  return (
    <S.Container>
      {isModalOpen && (
        <Modal
          isFullScreen={isFullScreen}
          hasCloseButton={false}
          onClose={() => setIsModalOpen(false)}
        >
          <S.ModalSetting>
            {!isFullScreen ? (
              <>
                <S.ImgButton
                  src={fullscreen}
                  alt="fullscreen"
                  onClick={() => {
                    setIsFullScreen(true);
                  }}
                />

                <S.ImgButton
                  src={close}
                  alt="close"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                />
              </>
            ) : (
              <S.ImgButton
                src={smallscreen}
                alt="smallscreen"
                onClick={() => {
                  setIsFullScreen(false);
                }}
              />
            )}
          </S.ModalSetting>
          {isFullScreen && <S.Date>{dayjs().format('YYYY년 M월 D일')}</S.Date>}
          <S.Title isFullScreen={isFullScreen}>출석코드</S.Title>
          <S.AttendanceCode isFullScreen={isFullScreen}>
            {data.code}
          </S.AttendanceCode>
        </Modal>
      )}

      {isAdmin && type === 'meetings' && (
        <Button
          color={theme.color.mainMiddle}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          출석코드 확인
        </Button>
      )}
      <S.ContentBlock>
        {isOneday ? (
          <S.Time>
            <img src={icCalendar} alt="calendar" style={{ marginRight: 5 }} />
            <div>
              {dayjs(data.start).format('YYYY년 M월 D일')} (
              {WEEK_DAYS[new Date(data.start).getDay()]}){' '}
              {dayjs(data.start).format('HH:mm')} ~{' '}
              {dayjs(data.end).format('HH:mm')}
            </div>
          </S.Time>
        ) : (
          <>
            <S.Time>
              <img src={icCalendar} alt="calendar" style={{ marginRight: 5 }} />
              <div>
                {dayjs(data.start).format('YYYY년 M월 D일')} (
                {WEEK_DAYS[new Date(data.start).getDay()]}){' '}
                {dayjs(data.start).format('HH:mm')}
              </div>
            </S.Time>
            <S.Time>
              <S.EndTime>
                ~ {dayjs(data.end).format('YYYY년 M월 D일')} (
                {WEEK_DAYS[new Date(data.start).getDay()]}){' '}
                {dayjs(data.end).format('HH:mm')}
              </S.EndTime>
            </S.Time>
          </>
        )}
      </S.ContentBlock>
      <S.ContentBlock>
        <div>장소 : {data.location} </div>
        <div>준비물 : {data.requiredItem}</div>
      </S.ContentBlock>
      <S.ContentBlock>
        <div>{data.content}</div>
      </S.ContentBlock>
    </S.Container>
  );
};

export default EventContent;
