import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import theme from '../styles/theme';
import Header from '../components/Header/Header';
import InfoInput from '../components/MyPage/InfoInput';
import icCalendar from '../assets/images/ic_date.svg';
import icWave from '../assets/images/ic_wave.svg';
import DateInput from '../components/Calendar/DateInput';

const StyledCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  padding-bottom: 183px;
`;

const DatePickerWrapper = styled.div`
  height: 86px;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  margin: 12px 15px 4px 15px;
  padding-top: 10px;
`;

const StyledPicker = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const WaveImg = styled.img`
  margin: 0px 6px;
`;

const StyledTextArea = styled.textarea`
  height: 504px;
  resize: none;
  padding: 15px 10px;
  margin: 12px 15px;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: ${theme.color.grayScale.gray18};
  color: white;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const DatePicker = ({ status, onDateChange, origArr = [] }) => {
  return (
    <StyledPicker>
      {status === 'start' ? (
        <img src={icCalendar} alt="달력" />
      ) : (
        <WaveImg src={icWave} alt="물결" />
      )}
      <DateInput
        value={origArr[0]}
        width="58px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(0, value)}
      />
      년
      <DateInput
        value={origArr[1]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(1, value)}
      />
      월
      <DateInput
        value={origArr[2]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(2, value)}
      />
      일
      <DateInput
        value={origArr[3]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(3, value)}
      />
      :
      <DateInput
        value={origArr[4]}
        width="37px"
        height="28px"
        margin="5px"
        onChange={(value) => onDateChange(4, value)}
      />
    </StyledPicker>
  );
};

DatePicker.propTypes = {
  status: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  origArr: PropTypes.arrayOf(PropTypes.number),
};

// ISO형식의 값을 년/월/일/시/분으로 나눠서 배열로 저장
const getValue = (origDate) => {
  const splittedDate = origDate.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const newDate = splittedDate[0].split('-'); // [YYYY, MM, DD]
  const newTime = splittedDate[1].split(':'); // [HH, MM]

  const formattedDate = newDate.concat(newTime);

  return formattedDate;
};

const CreateEvent = () => {
  const { id } = useParams();
  const [eventInfo, setEventInfo] = useState([
    { key: 'title', value: '' },
    { key: 'startDateTime', value: '' },
    { key: 'endDateTime', value: '' },
    { key: 'location', value: '' },
    { key: 'requiredItems', value: '' },
    { key: 'memberNumber', value: '' },
    { key: 'content', value: '' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [startArr, setStartArr] = useState([]);
  const [endArr, setEndArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        };

        if (id) {
          const response = await axios.get(`${BASE_URL}/event/${id}`, {
            headers,
          });
          if (response.data.code === 200) {
            const { data } = response.data;
            setEventInfo([
              { key: 'title', value: data.title },
              {
                key: 'startDateTime',
                value: data.start,
              },
              {
                key: 'endDateTime',
                value: data.end,
              },
              { key: 'location', value: data.location },
              { key: 'requiredItems', value: data.requiredItems },
              { key: 'memberNumber', value: data.memberNumber },
              { key: 'content', value: data.content },
            ]);
            setStartArr(getValue(data.start));
            setEndArr(getValue(data.end));

            console.log('가져온 데이터', data);
            console.log('startArr', startArr);
            console.log('endArr', endArr);
          } else {
            setError(response.data.message);
          }
        }
      } catch (err) {
        setError('An error occurred while fetching the data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const editValue = (key, value) => {
    const updatedEventInfo = eventInfo.map((item) =>
      item.key === key ? { ...item, value } : item,
    );
    setEventInfo(updatedEventInfo);
  };

  const editDate = (key, date) => {
    const updatedEventInfo = eventInfo.map((item) =>
      item.key === key ? { ...item, value: date } : item,
    );
    setEventInfo(updatedEventInfo);
  };

  const onSave = async () => {
    if (window.confirm('저장하시겠습니까?')) {
      try {
        const data = eventInfo.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});

        const startDate = eventInfo.find(
          (item) => item.key === 'startDateTime',
        ).value;
        const endDate = eventInfo.find(
          (item) => item.key === 'endDateTime',
        ).value;

        if (startDate.length === 5) {
          const [startYear, startMonth, startDay, startHour, startMinute] =
            startDate;
          const startDateObj = new Date(
            startYear,
            startMonth - 1,
            startDay,
            startHour,
            startMinute,
          );
          data.startDateTime = startDateObj.toISOString();
        } else {
          data.startDateTime = '';
        }

        if (endDate.length === 5) {
          const [endYear, endMonth, endDay, endHour, endMinute] = endDate;
          const endDateObj = new Date(
            endYear,
            endMonth - 1,
            endDay,
            endHour,
            endMinute,
          );
          data.endDateTime = endDateObj.toISOString();
        } else {
          data.endDateTime = '';
        }
        const response = await axios.patch(
          `${BASE_URL}/admin/event/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Authorization_refresh: `Bearer ${refreshToken}`,
            },
          },
        );
        console.log(response);
        alert('저장이 완료되었습니다.');
        navigate('/calendar');
      } catch (err) {
        console.error(err);
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <StyledCreate>
      <Header
        title="일정 수정"
        text="완료"
        color="mainColor"
        onClick={onSave}
      />
      <InfoInput
        placeholder="제목"
        origValue={eventInfo.find((item) => item.key === 'title')?.value || ''}
        padding="15px"
        align="left"
        editValue={(value) => editValue('title', value)}
      />
      <DatePickerWrapper>
        <DatePicker
          status="start"
          onDateChange={(index, value) => {
            const startDate = [
              ...eventInfo.find((item) => item.key === 'startDateTime').value,
            ];
            startDate[index] = value;
            editDate('startDateTime', startDate);
          }}
          origArr={startArr}
        />
        <DatePicker
          status="end"
          onDateChange={(index, value) => {
            const endDate = [
              ...eventInfo.find((item) => item.key === 'endDateTime').value,
            ];
            endDate[index] = value;
            editDate('endDateTime', endDate);
          }}
          origArr={endArr}
        />
      </DatePickerWrapper>
      <InfoInput
        text="장소"
        origValue={
          eventInfo.find((item) => item.key === 'location')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('location', value)}
      />
      <InfoInput
        text="준비물"
        origValue={
          eventInfo.find((item) => item.key === 'requiredItems')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('requiredItems', value)}
      />
      <InfoInput
        text="총인원"
        origValue={
          eventInfo.find((item) => item.key === 'memberNumber')?.value || ''
        }
        width="75%"
        padding="15px"
        align="left"
        editValue={(value) => editValue('memberNumber', value)}
      />
      <StyledTextArea
        placeholder="내용"
        value={eventInfo.find((item) => item.key === 'content')?.value || ''}
        onChange={(e) => editValue('content', e.target.value)}
      />
    </StyledCreate>
  );
};

export default CreateEvent;
