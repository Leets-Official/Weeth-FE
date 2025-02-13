/* eslint-disable no-alert */
import { EventRequestType, createEvent, editEvent } from '@/api/EventAdminAPI';
import Header from '@/components/Header/Header';
import {
  CURRENT_DAY,
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '@/constants/dateConstants';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/event/EventEditor.styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetEventInfo from '@/api/getEventInfo';
import replaceNewLines from '@/hooks/newLine';
import useGetUserInfo from '@/api/useGetUserInfo';
import ISOtoArray from '@/hooks/ISOtoArray';
import toTwoDigits from '@/hooks/toTwoDigits';
import CardinalDropdown from '@/components/common/CardinalDropdown';
import Modal from '@/components/common/Modal';
import Button from '@/components/Button/Button';
import ToggleButton from '@/components/common/ToggleButton';
import EventInput, { EventInputBlock } from '@/components/Event/EventInput';
import CardinalLabel from '@/components/Event/CardinalLabel';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isMeeting, setIsMeeting] = useState(false);
  const [eventRequest, setEventRequest] = useState<EventRequestType>({
    title: '',
    cardinal: 0,
    start: '',
    end: '',
    location: '',
    requiredItem: '',
    content: '',
  });

  const [startArr, setStartArr] = useState([
    CURRENT_YEAR,
    CURRENT_MONTH,
    CURRENT_DAY,
    0,
    0,
  ]);
  const [endArr, setEndArr] = useState([
    CURRENT_YEAR,
    CURRENT_MONTH,
    CURRENT_DAY,
    23,
    59,
  ]);

  useEffect(() => {
    if (eventDetailData) {
      setStartArr(ISOtoArray((eventDetailData as EventRequestType).start));
      setEndArr(ISOtoArray((eventDetailData as EventRequestType).end));
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
      {isModalOpen && (
        <Modal hasCloseButton onClose={() => setIsModalOpen(false)}>
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
              <div>정기모임</div>
              <S.Help onClick={() => setIsModalOpen(true)}>?</S.Help>
            </S.Align>

            <ToggleButton
              isMeeting={isMeeting}
              isEditMode={isEditMode}
              onToggle={() => {
                setIsMeeting(!isMeeting);
              }}
            />
          </S.Meeting>
          <S.Line />
          <S.Cardinal>
            <CardinalDropdown
              origValue={eventRequest.cardinal}
              editValue={(value) => editEventInfo('cardinal', value)}
            />
            <S.CardinalList>
              <CardinalLabel
                key={eventRequest.cardinal}
                cardinal={eventRequest.cardinal}
              />
            </S.CardinalList>
          </S.Cardinal>
          <S.Line />
          <S.StartDate>
            <div>시작</div>
            <S.Time>
              <S.TimeBlock>
                {startArr.slice(0, 3).map(toTwoDigits).join('. ')}
              </S.TimeBlock>
              <S.TimeBlock>
                {startArr.slice(3, 5).map(toTwoDigits).join(':')}
              </S.TimeBlock>
            </S.Time>
          </S.StartDate>
          <S.Line />
          <S.StartDate>
            <div>끝</div>
            <S.Time>
              <S.TimeBlock>
                {endArr.slice(0, 3).map(toTwoDigits).join('. ')}
              </S.TimeBlock>
              <S.TimeBlock>
                {endArr.slice(3, 5).map(toTwoDigits).join(':')}
              </S.TimeBlock>
            </S.Time>
          </S.StartDate>
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
