import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

import icDot from '../../assets/images/ic_dot.svg';
// import { EventContext } from '../../hooks/EventContext';

const StyledYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.grayScale.gray18};
  padding: 10px;
  margin-bottom: 15px;
  width: 143px; //사이즈 수정 필요
  border-radius: 10px;
  font-size: 14px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
`;

const Dot = styled.img`
  padding-left: 8px;
  padding-right: 10px;
`;

const MonthName = styled.div`
  padding-left: 10px;
  padding-bottom: 7px;
  color: ${(props) => (props.istoday === 'true' ? '#00dda8' : '#ffffff')};
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const EventComponent = ({ title }) => {
  return (
    <Content>
      <Dot src={icDot} alt="dot" />
      <div>{title}</div>
    </Content>
  );
};

EventComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

const MonthlyEvent = ({ thisMonth, month, year }) => {
  const [yearEvnetData, setYearEventData] = useState(null);
  const [error, setError] = useState(null);
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  const yearNumber = parseInt(year, 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (year) {
          const response = await axios.get(
            `http://13.125.78.31:8080/event/year`,
            {
              headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
              },
              params: {
                year: yearNumber,
              },
            },
          );
          if (response.data.code === 200) {
            console.log('response data', response.data.data);
            setYearEventData(response.data.data);
          } else {
            console.log(response);
            setError('error!', response.data.message);
          }
        }
      } catch (err) {
        console.error('API Request Error:', err); // 에러 로그
        setError('An error occurred while fetching the data');
      }
    };

    fetchData();
  }, [year]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!yearEvnetData) {
    return <div>Loading...</div>;
  }

  const istoday = thisMonth === month;
  const events = yearEvnetData[thisMonth] || [];

  return (
    <StyledYear>
      <MonthName istoday={istoday.toString()}>{thisMonth}월</MonthName>
      <ContentWrapper>
        {events.length > 0 ? (
          events.map((event) => (
            <EventComponent key={event.id} title={event.title} />
          ))
        ) : (
          <EventComponent title="일정이 없습니다!" />
        )}
      </ContentWrapper>
    </StyledYear>
  );
};

MonthlyEvent.propTypes = {
  thisMonth: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MonthlyEvent;
