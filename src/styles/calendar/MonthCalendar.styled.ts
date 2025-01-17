import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  font-family: ${theme.font.regular};
  font-size: 16px;
  z-index: 2;
`;

export const Calendar = styled.div`
  .fc {
    font-size: 12px;
    border: none;
  }

  // 라이브러리 기본 오늘 표시 제거
  .fc-day-today {
    background-color: transparent !important;
  }

  // 월화수목금토일 표시 스타일링
  .fc-col-header-cell {
    background-color: ${theme.color.gray[12]};
    padding-bottom: 8px;
    border: none;
  }

  .fc-col-header {
    background-color: ${theme.color.gray[12]};
    border: 1.5px solid ${theme.color.gray[20]};
  }

  .fc .fc-scrollgrid-section, .fc .fc-scrollgrid-section table, .fc .fc-scrollgrid-section > td {
    padding-top: 15px;
  }

  // 셀 테두리 제거
  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th{
    border: none;
  }

  // 날짜 스타일링
  .fc-daygrid-day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  // 주말 색상 변경
  .fc-day-sun a {
    color: ${theme.color.negative};
  }
  .fc-day-sat a {
    color: ${theme.color.positive};
  }

  // 기본 일정 표시 스타일링
  .fc-event,
  .fc-event-dot {
    padding: 0 10px;
    display: flex;
    height: 20px;
    background-color: ${theme.color.gray[18]}; !important;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }

  // 2일 이상 일정 표시 스타일링
  .fc-daygrid-event.fc-daygrid-block-event:first-child {
    display: flex;
    height: 20px;
    align-items: center;
    margin-left: 2px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .fc-event-main {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // 일정 호버 
  .fc-event:hover {
    padding: 3px 10px;
    background-color: ${theme.color.positive}; !important;
    border: none;
    border-radius: 20px;
    color: white !important;
    cursor: pointer;
  }
  
  // 각 날짜 셀 스타일링
  .fc .fc-daygrid-day-events {
    height: 72px;
    margin: 0;
  }


  // 라이브러리 기본 스타일 제거
  .fc-daygrid-event-dot {
    display: none;
  }

  // 일정 시간 표시 제거
  .fc-event-time {
    display: none;
  }

  .fc-event-title {
    padding: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 8px;
    font-weight: 400; //볼드가 자동으로 생겨서 강제로 굵기를 조절했음
  }
`;

export const Today = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 1px;
  right: 1px;
  background: ${theme.color.main};
  border-radius: 10px;
  padding-top: 2px;
  width: 52px;
  height: 94px;
  z-index: 0;
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const TodayDate = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin: 20px 0 15px 25px;
`;
