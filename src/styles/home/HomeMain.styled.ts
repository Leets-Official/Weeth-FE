import theme from '@/styles/theme';
import styled from 'styled-components';

export const StyledHomeMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  width: 94%;
  margin: 7.3% 3% 0px 3%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'calendar penalty'
    'board member'
    'board fee';
  gap: 10px;
`;

export const GridItem = styled.div`
  background-color: ${theme.color.gray[18]};
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  display: flex;
  padding: 20px 10px 10px 15px;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

export const CalendarItem = styled(GridItem)`
  grid-area: calendar;
`;

export const PenaltyItem = styled(GridItem)`
  grid-area: penalty;
`;

export const BoardItem = styled(GridItem)`
  grid-area: board;
`;

export const MemberItem = styled(GridItem)`
  grid-area: member;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const FeeItem = styled(GridItem)`
  grid-area: fee;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const PlaceholderImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.gray[18]};
  align-self: flex-end;
  justify-self: flex-start;
`;
