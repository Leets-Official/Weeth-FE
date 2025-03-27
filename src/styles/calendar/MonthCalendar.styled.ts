import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  font-size: 16px;
  z-index: 2;
`;

export const Bar = styled.div<{ isMeeting: boolean }>`
  width: 1.5px;
  height: 10px;
  background-color: ${(props) => (props.isMeeting ? theme.color.main : '#fff')};
  border-radius: 20px;
  margin: 0 2px;
`;

export const Calendar = styled.div`

  div {
    text-overflow: clip !important;
  }

  .fc {
    font-size: 12px;
    border: none;
  }

  // 라이브러리 기본 오늘 표시 제거
  .fc-day-today {
    background-color: transparent !important;
  }

  // 선택한 날짜 표시 스타일링
  .fc-highlight {
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

  .fc .fc-scrollgrid-section,
  .fc .fc-scrollgrid-section table,
  .fc .fc-scrollgrid-section > td {
    padding-top: 15px;
  }

  .fc-daygrid-more-link {
    display: none !important;
  }

  // 셀 테두리 제거
  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none;
  }

  // 날짜 스타일링
  .fc-daygrid-day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-family: ${theme.font.semiBold};
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
    padding-right: 2px;
    display: flex;
    width: 50px !important;
    height: 16px;
    background-color: rgba(255, 255, 255, 0.03); !important;
    border: none;
    border-radius: 1px;
    font-family: ${theme.font.semiBold};
  }

  // 2일 이상 일정 표시 스타일링
  .fc-daygrid-event.fc-daygrid-block-event:first-child {
    display: flex;
    height: 20px;
    align-items: center;
    margin-left: 2px;
    border-radius: 1px;
  }

  .fc-event-main {
    overflow: hidden;
  }

  // 각 날짜 셀 스타일링
  .fc .fc-daygrid-day-events {
    height: 46px;
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
`;

export const SelectedDateOnCalendar = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 1px;
  right: 0.5px;
  background: ${theme.color.mainMiddle};
  border-radius: 10px;
  padding-top: 2px;
  width: 52px;
  height: 70px;
  z-index: 10;
`;

export const Today = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 1px;
  right: 0.5px;
  background: ${theme.color.gray[9]};
  border-radius: 10px;
  padding-top: 2px;
  width: 52px;
  height: 70px;
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const SelectedDate = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin: 20px 0 15px 25px;
`;

export const NoEvent = styled.div`
  width: 345px;
  height: 63px;
  background-color: ${theme.color.gray[18]};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.gray[65]};
  font-weight: 500;
`;
