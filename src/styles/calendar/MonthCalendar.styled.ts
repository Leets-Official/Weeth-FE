import theme from '@/styles/theme';
import styled from 'styled-components';

export const Calendar = styled.div`
  width: 100%;
  padding-bottom: 183px;
  font-family: ${theme.font.regular};
  font-size: 16px;
  z-index: 2;

  .fc {
    font-size: 12px;
    border: none;
  }

  .fc-day-today {
    background-color: transparent !important;
  }

  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: ${theme.color.gray[12]};
  }

  .fc-col-header-cell 
  {
    background-color: ${theme.color.gray[12]};
    padding-bottom: 15px;
    border: none;
  }

  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none;
  }

  .fc-daygrid-day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .fc-day-sun a {
    color: ${theme.color.negative};
  }

  .fc-day-sat a {
    color: ${theme.color.positive};
  }

  .fc-event,
  .fc-event-dot {
    padding: 3px 10px;
    background-color: ${theme.color.gray[18]}; !important;
    border: none;
    border-radius: 20px;
    color: white !important;
    cursor: pointer;
  }

  .fc-event:hover {
    padding: 3px 10px;
    background-color: ${theme.color.positive}; !important;
    border: none;
    border-radius: 20px;
    color: white !important;
    cursor: pointer;
  }
  
  .fc-daygrid-event.fc-daygrid-block-event:first-child {
    height: 19px;
    margin-left: 2px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .fc-daygrid-event.fc-daygrid-block-event:last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .fc-daygrid-event-dot {
    display: none;
  }

  .fc-event-time {
    display: none;
  }

  .fc-event-title {
    padding: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400; //볼드가 자동으로 생겨서 강제로 굵기를 조절했음
  }
`;

export const Today = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1px;
  right: 7px;
  background: ${theme.color.main};
  border-radius: 10px;
  width: 38px;
  height: 22px;
  z-index: 0;
`;
