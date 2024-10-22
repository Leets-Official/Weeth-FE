import styled from 'styled-components';
import theme from '@/styles/theme';

export const StyledHomeMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

export const CaptionContainer = styled.div`
  margin-left: 7%;
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
  background-color: ${theme.color.grayScale.gray18};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 18px;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
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
  padding-right: 8%;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.grayScale.gray18};
  width: 19%;
  border-radius: 5px;
  align-self: flex-end;
  justify-self: flex-start;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  width: 90%;
  margin: 2.5% 0px 5% 5%;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Name = styled.div`
  font-size: 32px;
  font-weight: bold;
  padding: 0px;
  align-self: flex-end;
  font-family: var(--font-family-pretendard_semiBold);
`;

export const NickName = styled.div`
  font-size: 14px;
  font-family: var(--font-family-pretendard_regular);
  margin-left: 8px;
  align-self: flex-end;
  padding-bottom: 5px;
`;

export const RightButtonContainer = styled.div`
  display: flex;
  padding-bottom: 5px;
  align-items: center;
  align-self: flex-end;
  margin-right: 10px;
`;
