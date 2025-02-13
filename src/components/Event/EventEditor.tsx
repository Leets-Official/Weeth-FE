/* eslint-disable no-alert */
import { DayPicker } from 'react-day-picker';
import { EventRequestType, createEvent, editEvent } from '@/api/EventAdminAPI';
import Header from '@/components/Header/Header';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/event/EventEditor.styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetEventInfo from '@/api/getEventInfo';
import replaceNewLines from '@/hooks/newLine';
import useGetUserInfo from '@/api/useGetUserInfo';
import CardinalDropdown from '@/components/common/CardinalDropdown';
import Modal from '@/components/common/Modal';
import Button from '@/components/Button/Button';
import ToggleButton from '@/components/common/ToggleButton';
import EventInput, { EventInputBlock } from '@/components/Event/EventInput';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

function checkEmpty(
  field: string | number | undefined,
  message: string,
): boolean {
  // TODO🚨important!!🚨: 배열 내에 빈 값이 있는 경우를 처리하는 로직 추가
  if (Array.isArray(field) && field.length === 0) {
    alert(message);
    return true;
  }
  return false;
}

const EventEditor = () => {
  useCustomBack('/calendar');

  const { id } = useParams();
  const { data: eventDetailData, error } = useGetEventInfo('events', id);
  const { userInfo } = useGetUserInfo();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isStartDateModalOpen, setIsStartDateModalOpen] = useState(false);
  const [isEndDateModalOpen, setIsEndDateModalOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<
    Date | undefined
  >();
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>();

  const [eventRequest, setEventRequest] = useState<EventRequestType>({
    title: '',
    cardinal: 0,
    isMeeting: false,
    start: '',
    end: '',
    location: '',
    requiredItem: '',
    content: '',
  });

  console.log(eventRequest);

  useEffect(() => {
    if (eventDetailData) {
      setEventRequest(eventDetailData);
    }
  }, [eventDetailData]);

  const editEventInfo = (key: keyof EventRequestType, value: any) => {
    setEventRequest((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const onSave = async () => {
    const data = {
      ...eventRequest,
      content:
        typeof eventRequest.content === 'string'
          ? replaceNewLines(eventRequest.content)
          : '',
    };

    if (
      checkEmpty(data.title, '제목을 입력해 주세요.') ||
      checkEmpty(data.cardinal, '기수를 입력해 주세요.') ||
      checkEmpty(data.start, '시작 시간을 입력해 주세요.') ||
      checkEmpty(data.end, '종료 시간을 입력해 주세요.') ||
      checkEmpty(data.location, '장소를 입력해 주세요.') ||
      checkEmpty(data.requiredItem, '준비물을 입력해 주세요.') ||
      checkEmpty(data.content, '내용을 입력해 주세요.')
    ) {
      return;
    }
    if (data.start === data.end) {
      alert('시작 시간과 종료 시간은 같을 수 없습니다.');
      return;
    }
    if (data.start > data.end) {
      alert('종료 시간은 시작 시간보다 빠를 수 없습니다.');
      return;
    }

    if (window.confirm('저장하시겠습니까?')) {
      try {
        if (isEditMode) await editEvent(data, Number(id));
        else await createEvent(data);
        alert('저장이 완료되었습니다.');
        navigate('/calendar');
      } catch (err: any) {
        if (err.response.status === 403) {
          alert('일정 생성 및 수정은 운영진만 가능합니다.');
          return;
        }
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  if (userInfo && userInfo.role !== 'ADMIN') {
    return <S.Error>일정 생성 및 수정은 운영진만 가능합니다</S.Error>;
  }

  if (error) return <S.Error>{error}</S.Error>;

  return (
    <>
      {isHelpModalOpen && (
        <Modal hasCloseButton onClose={() => setIsHelpModalOpen(false)}>
          <S.Bold>정기모임</S.Bold>
          <S.Description>
            선택한 기수에 해당하는 날짜로 출석 요청을 진행 합니다. 출석 코드는
            일정 상세 페이지에서 운영진만 확인 가능합니다.
            <br />
            <br />
            만약 원하는 기수가 목록에 없다면, 관리자 서비스 에서 새로운 기수를
            추가해 주세요.
          </S.Description>
          <Button width="305px" onClick={() => navigate('/admin/member')}>
            관리자 서비스 바로가기
          </Button>
        </Modal>
      )}

      {/* 시작 날짜 모달 */}
      {isStartDateModalOpen && (
        <Modal
          hasCloseButton={false}
          onClose={() => setIsStartDateModalOpen(false)}
        >
          <DayPicker
            mode="single"
            selected={selectedStartDate}
            onSelect={(date) => {
              if (date) {
                const kstStart = dayjs(date).tz('Asia/Seoul').format(); // 한국 시간
                editEventInfo('start', kstStart);
                setSelectedStartDate(date); // 선택된 날짜로 업데이트
                setIsStartDateModalOpen(false);
              }
            }}
            footer={
              selectedStartDate
                ? `선택된 날짜: ${dayjs(selectedStartDate).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm')}`
                : '시작 날짜를 선택하세요.'
            }
          />
        </Modal>
      )}

      {/* 종료 날짜 모달 */}
      {isEndDateModalOpen && (
        <Modal
          hasCloseButton={false}
          onClose={() => setIsEndDateModalOpen(false)}
        >
          <DayPicker
            mode="single"
            selected={selectedEndDate}
            onSelect={(date) => {
              if (date) {
                const kstEnd = dayjs(date).tz('Asia/Seoul').format(); // 한국 시간
                editEventInfo('end', kstEnd);
                setSelectedEndDate(date); // 선택된 날짜로 업데이트
                setIsEndDateModalOpen(false);
              }
            }}
            footer={
              selectedEndDate
                ? `선택된 날짜: ${dayjs(selectedEndDate).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm')}`
                : '종료 날짜를 선택하세요.'
            }
          />
        </Modal>
      )}

      <Header onClickRightButton={onSave} RightButtonType="TEXT" isAccessible>
        {isEditMode ? '일정 수정' : '일정 추가'}
      </Header>
      <S.EventEditorWrapper>
        <EventInputBlock>
          <EventInput
            origValue={eventRequest.title}
            placeholder="제목"
            editValue={(value) => editEventInfo('title', value)}
          />
        </EventInputBlock>

        <EventInputBlock>
          <S.Meeting>
            <S.Align>
              <span>정기모임</span>
              <S.Help onClick={() => setIsHelpModalOpen(true)}>?</S.Help>
            </S.Align>

            <ToggleButton
              isMeeting={eventRequest.isMeeting}
              isEditMode={isEditMode}
              onToggle={() => {
                setEventRequest((prevInfo) => ({
                  ...prevInfo,
                  isMeeting: !prevInfo.isMeeting,
                }));
              }}
            />
          </S.Meeting>
          <S.Meeting>
            <div>기수</div>
            <CardinalDropdown
              origValue={eventRequest.cardinal}
              editValue={(value) => editEventInfo('cardinal', value)}
            />
          </S.Meeting>
          <S.DateTime>
            <div>시작</div>
            <S.Time>
              <S.TimeBlock onClick={() => setIsStartDateModalOpen(true)}>
                {selectedStartDate?.toLocaleDateString() ||
                  dayjs(eventRequest.start).format('YYYY.MM.DD')}
              </S.TimeBlock>
              <S.TimeBlock>startTime</S.TimeBlock>
            </S.Time>
          </S.DateTime>
          <S.Line />
          <S.DateTime>
            <div>끝</div>
            <S.Time>
              <S.TimeBlock onClick={() => setIsEndDateModalOpen(true)}>
                {selectedEndDate?.toLocaleDateString() ||
                  dayjs(eventRequest.end).format('YYYY.MM.DD')}
              </S.TimeBlock>
              <S.TimeBlock>endTime</S.TimeBlock>
            </S.Time>
          </S.DateTime>
        </EventInputBlock>

        <EventInputBlock>
          <EventInput
            origValue={eventRequest.location}
            placeholder="장소"
            editValue={(value) => editEventInfo('location', value)}
          />
          <S.Line />
          <EventInput
            origValue={eventRequest.requiredItem}
            placeholder="준비물"
            editValue={(value) => editEventInfo('requiredItem', value)}
          />
        </EventInputBlock>

        <S.TextAreaWrapper>
          <S.TextArea
            placeholder="내용"
            value={eventRequest.content}
            onChange={(e) => editEventInfo('content', e.target.value)}
          />
        </S.TextAreaWrapper>
      </S.EventEditorWrapper>
    </>
  );
};

export default EventEditor;
