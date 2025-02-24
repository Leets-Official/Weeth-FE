import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { ko } from 'date-fns/locale';
import { EventRequestType, createEvent, editEvent } from '@/api/EventAdminAPI';
import Header from '@/components/Header/Header';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/event/EventEditor.styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetEventInfo from '@/api/getEventInfo';
import replaceNewLines from '@/hooks/newLine';
import CardinalDropdown from '@/components/common/CardinalDropdown';
import Modal from '@/components/common/Modal';
import Button from '@/components/Button/Button';
import ToggleButton from '@/components/common/ToggleButton';
import EventInput, { EventInputBlock } from '@/components/Event/EventInput';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import PickerModal from '@/components/Event/PickerModal';
import TimePicker from '@/components/Event/TimePicker';
import DeleteModal from '@/components/Modal/DeleteModal';
import Loading from '@/components/common/Loading';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '@/components/common/ToastMessage';

dayjs.extend(utc);
dayjs.extend(timezone);

function checkEmpty(field: string | number, message: string) {
  if (typeof field === 'string' && field.trim().length === 0) {
    toastInfo(message);
    return true;
  }
  if (typeof field === 'number' && (Number.isNaN(field) || field === 0)) {
    toastError(message);
    return true;
  }

  return false;
}

const EventEditor = () => {
  useCustomBack('/calendar');

  const { id } = useParams();
  const {
    data: eventDetailData,
    loading,
    error,
  } = useGetEventInfo('events', id);
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStartDateModalOpen, setIsStartDateModalOpen] = useState(false);
  const [isEndDateModalOpen, setIsEndDateModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('12:00 AM');
  const [endTime, setEndTime] = useState('11:59 PM');

  const [eventRequest, setEventRequest] = useState<EventRequestType>({
    title: '',
    // TODO: (refactor) 서버로부터 받은 기수값을 이용하여 초기값 설정하는 로직 추가
    cardinal: 5,
    type: 'EVENT',
    start: '',
    end: '',
    location: '',
    requiredItem: '',
    content: '',
  });

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

  useEffect(() => {
    if (startDate && startTime) {
      const [time, period] = startTime.split(' ');
      const [hour, minute] = time.split(':');

      let adjustedHour = parseInt(hour, 10);
      if (period === 'PM' && adjustedHour < 12) {
        adjustedHour += 12;
      }
      if (period === 'AM' && adjustedHour === 12) {
        adjustedHour = 0;
      }

      const startDateTime = dayjs(startDate)
        .set('hour', adjustedHour)
        .set('minute', parseInt(minute, 10))
        .set('second', 0)
        .set('millisecond', 0)
        .tz('Asia/Seoul')
        .format('YYYY-MM-DDTHH:mm:ss');

      setEventRequest((prevInfo) => ({
        ...prevInfo,
        start: startDateTime,
      }));
    }
  }, [startDate, startTime]);

  useEffect(() => {
    if (endDate && endTime) {
      const [time, period] = endTime.split(' ');
      const [hour, minute] = time.split(':');

      let adjustedHour = parseInt(hour, 10);
      if (period === 'PM' && adjustedHour < 12) {
        adjustedHour += 12;
      }
      if (period === 'AM' && adjustedHour === 12) {
        adjustedHour = 0;
      }

      const endDateTime = dayjs(endDate)
        .set('hour', adjustedHour)
        .set('minute', parseInt(minute, 10))
        .set('second', 0)
        .set('millisecond', 0)
        .tz('Asia/Seoul')
        .format('YYYY-MM-DDTHH:mm:ss');

      setEventRequest((prevInfo) => ({
        ...prevInfo,
        end: endDateTime,
      }));
    }
  }, [endDate, endTime]);

  const checkValid = async () => {
    setEventRequest({
      ...eventRequest,
      content:
        typeof eventRequest.content === 'string'
          ? replaceNewLines(eventRequest.content)
          : '',
    });

    if (
      checkEmpty(eventRequest.title, '제목을 입력해 주세요.') ||
      checkEmpty(eventRequest.cardinal, '기수를 입력해 주세요.') ||
      checkEmpty(eventRequest.start, '시작 시간을 입력해 주세요.') ||
      checkEmpty(eventRequest.end, '종료 시간을 입력해 주세요.') ||
      checkEmpty(eventRequest.location, '장소를 입력해 주세요.') ||
      checkEmpty(eventRequest.requiredItem, '준비물을 입력해 주세요.') ||
      checkEmpty(eventRequest.content, '내용을 입력해 주세요.')
    ) {
      return;
    }

    const startDateTime = new Date(eventRequest.start);
    const endDateTime = new Date(eventRequest.end);

    const startISO = startDateTime
      .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
      .replace(' ', 'T');
    const endISO = endDateTime
      .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
      .replace(' ', 'T');

    if (startISO === endISO) {
      toastInfo('시작 시간과 종료 시간은 같을 수 없습니다.');
    }
    if (startISO > endISO) {
      toastInfo('종료 시간은 시작 시간보다 빠를 수 없습니다.');
    } else {
      setIsDeleteModalOpen(true);
    }
  };

  const handleSave = async () => {
    try {
      if (isEditMode) await editEvent(eventRequest, Number(id));
      else await createEvent(eventRequest);
      toastSuccess('저장이 완료되었습니다.');
      navigate('/calendar');
    } catch (err: any) {
      if (err.response.status === 403) {
        toastInfo('일정 생성 및 수정은 운영진만 가능합니다.');
        return;
      }
      toastError('저장 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <Loading />;

  if (error) return <S.Error>{error}</S.Error>;

  return (
    <>
      {/* 도움말 모달 */}
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
        <PickerModal onClose={() => setIsStartDateModalOpen(false)}>
          <DayPicker
            locale={ko}
            mode="single"
            selected={startDate}
            formatters={{
              formatMonthCaption: (month) =>
                `${month.getFullYear()}년 ${month.getMonth() + 1}월`,
            }}
            onSelect={(date) => {
              if (date) {
                const kstStart = dayjs(date).tz('Asia/Seoul').format(); // 한국 시간
                editEventInfo('start', kstStart);
                setStartDate(date); // 선택된 날짜로 업데이트
                setIsStartDateModalOpen(false);
              }
            }}
          />
        </PickerModal>
      )}

      {/* 종료 날짜 모달 */}
      {isEndDateModalOpen && (
        <PickerModal onClose={() => setIsEndDateModalOpen(false)}>
          <DayPicker
            mode="single"
            selected={endDate}
            formatters={{
              formatMonthCaption: (month) =>
                `${month.getFullYear()}년 ${month.getMonth() + 1}월`,
            }}
            onSelect={(date) => {
              if (date) {
                const kstEnd = dayjs(date).tz('Asia/Seoul').format(); // 한국 시간
                editEventInfo('end', kstEnd);
                setEndDate(date); // 선택된 날짜로 업데이트
                setIsEndDateModalOpen(false);
              }
            }}
          />
        </PickerModal>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          title="일정 생성"
          content="일정을 생성하시겠습니까?"
          buttonContent="생성"
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleSave}
        />
      )}

      <Header
        onClickRightButton={checkValid}
        RightButtonType="TEXT"
        isAccessible
      >
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
              isMeeting={eventRequest.type === 'MEETING'}
              isEditMode={isEditMode}
              onToggle={() => {
                setEventRequest((prevInfo) => ({
                  ...prevInfo,
                  type: prevInfo.type === 'MEETING' ? 'EVENT' : 'MEETING',
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
                {startDate?.toLocaleDateString() ||
                  dayjs(eventRequest.start).format('YYYY.MM.DD')}
              </S.TimeBlock>
              <S.TimeBlock>
                <TimePicker
                  inputValue={startTime}
                  setInputValue={setStartTime}
                />
              </S.TimeBlock>
            </S.Time>
          </S.DateTime>
          <S.Line />
          <S.DateTime>
            <div>끝</div>
            <S.Time>
              <S.TimeBlock onClick={() => setIsEndDateModalOpen(true)}>
                {endDate?.toLocaleDateString() ||
                  dayjs(eventRequest.end).format('YYYY.MM.DD')}
              </S.TimeBlock>
              <S.TimeBlock>
                <TimePicker inputValue={endTime} setInputValue={setEndTime} />
              </S.TimeBlock>
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
