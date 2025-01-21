/* eslint-disable no-alert */
import { EventRequestType, createEvent, editEvent } from '@/api/EventAdminAPI';
import Header from '@/components/Header/Header';
// import {
//   CURRENT_DAY,
//   CURRENT_MONTH,
//   CURRENT_YEAR,
// } from '@/constants/dateConstants';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/event/EventEditor.styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetEventInfo from '@/api/getEventInfo';
import replaceNewLines from '@/hooks/newLine';
import useGetUserInfo from '@/api/useGetUserInfo';
import EventInput, { EventInputBlock } from './EventInput';
import ToggleButton from '../common/ToggleButton';

function checkEmpty(field: string | undefined, message: string): boolean {
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
  const [eventRequest, setEventRequest] = useState<EventRequestType>({
    title: '',
    start: '',
    end: '',
    location: '',
    requiredItem: '',
    memberCount: '',
    content: '',
  });

  // const [startArr, setStartArr] = useState([
  //   CURRENT_YEAR,
  //   CURRENT_MONTH,
  //   CURRENT_DAY,
  //   0,
  //   0,
  // ]);
  // const [endArr, setEndArr] = useState([
  //   CURRENT_YEAR,
  //   CURRENT_MONTH,
  //   CURRENT_DAY,
  //   23,
  //   59,
  // ]);

  useEffect(() => {
    if (eventDetailData) {
      // setStartArr(ISOtoArray((eventDetailData as EventRequestType).start));
      // setEndArr(ISOtoArray((eventDetailData as EventRequestType).end));
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
      checkEmpty(data.start, '시작 시간을 입력해 주세요.') ||
      checkEmpty(data.end, '종료 시간을 입력해 주세요.') ||
      checkEmpty(data.location, '장소를 입력해 주세요.') ||
      checkEmpty(data.requiredItem, '준비물을 입력해 주세요.') ||
      checkEmpty(data.memberCount, '총인원을 입력해 주세요.') ||
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
    <S.EventEditorWrapper>
      <Header onClickRightButton={onSave} RightButtonType="TEXT">
        {isEditMode ? '일정 수정' : '일정 추가'}
      </Header>

      <EventInputBlock>
        <EventInput
          origValue={eventRequest.title}
          placeholder="제목"
          editValue={(value) => editEventInfo('title', value)}
        />
      </EventInputBlock>

      <EventInputBlock>
        <S.Meeting>
          <div>정기모임</div>
          <ToggleButton />
        </S.Meeting>
        <S.Line />
        <S.StartDate>
          <div>시작</div>
          <S.Time>
            <S.TimeBlock>아무튼 달력</S.TimeBlock>
            <S.TimeBlock>시간</S.TimeBlock>
          </S.Time>
        </S.StartDate>
        <S.Line />
        <S.StartDate>
          <div>끝</div>
          <S.Time>
            <S.TimeBlock>아무튼 달력</S.TimeBlock>
            <S.TimeBlock>시간</S.TimeBlock>
          </S.Time>
        </S.StartDate>
      </EventInputBlock>

      <EventInputBlock>
        <EventInput
          origValue={eventRequest.title}
          placeholder="장소"
          editValue={(value) => editEventInfo('title', value)}
        />
        <S.Line />
        <EventInput
          origValue={eventRequest.title}
          placeholder="준비물"
          editValue={(value) => editEventInfo('title', value)}
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
  );
};

export default EventEditor;
