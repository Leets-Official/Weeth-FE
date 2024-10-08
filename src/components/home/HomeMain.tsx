import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Caption from '@/components/Caption';
import RightButton from '@/components/Header/RightButton';
import '@/components/home/HomeMain.css';
import theme from '@/styles/theme';

import { UserContext } from '@/service/UserContext';

import calendar from '@/assets/images/ic_home_calendar.svg';
import attend from '@/assets/images/ic_home_attend.svg';
import board from '@/assets/images/ic_home_board.svg';

const StyledHomeMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const CaptionContainer = styled.div`
  margin-left: 7%;
`;

const GridContainer = styled.div`
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

const GridItem = styled.div<{ color?: string }>`
  background-color: ${({ color }) => color || theme.color.grayScale.gray18};
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

const CalendarItem = styled(GridItem)`
  grid-area: calendar;
`;

const PenaltyItem = styled(GridItem)`
  grid-area: penalty;
`;

const BoardItem = styled(GridItem)`
  grid-area: board;
`;

const MemberItem = styled(GridItem)`
  grid-area: member;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const FeeItem = styled(GridItem)`
  grid-area: fee;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const PlaceholderImage = styled.div<{ color?: string }>`
  display: flex;
  padding-right: 8%;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color || theme.color.grayScale.gray18};
  width: 19%;
  border-radius: 5px;
  align-self: flex-end;
  justify-self: flex-start;
`;

const HomeMain: React.FC = () => {
  const navi = useNavigate();
  const { userData } = useContext(UserContext);

  const userName = userData?.name || 'Loading';
  const cardinal =
    userData?.cardinals.length >= 2
      ? userData.cardinals[userData.cardinals.length - 1]
      : userData?.cardinals[0] || 'Loading';

  return (
    <StyledHomeMain>
      <CaptionContainer>
        <Caption color="#ffffff" textcolor="#000000">
          {cardinal}기
        </Caption>
      </CaptionContainer>
      <div className="user-info">
        <div className="user-container">
          <div className="name">{userName}</div>
          <div className="nick-name">Elite님</div>
        </div>
        <div className="right-button">
          <RightButton
            onClick={() => {
              navi(`/mypage`);
            }}
          />
        </div>
      </div>
      <GridContainer>
        <CalendarItem
          onClick={() => {
            navi(`/calendar`);
          }}
        >
          동아리
          <br />
          일정 캘린더
          <PlaceholderImage>
            <img src={calendar} alt="캘린더 이미지" />
          </PlaceholderImage>
        </CalendarItem>
        <PenaltyItem
          onClick={() => {
            navi(`/attendance`);
          }}
        >
          출석 패널티
          <PlaceholderImage>
            <img src={attend} alt="출석 이미지" />
          </PlaceholderImage>
        </PenaltyItem>
        <BoardItem
          onClick={() => {
            navi(`/board`);
          }}
        >
          게시판
          <PlaceholderImage>
            <img src={board} alt="게시판 이미지" />
          </PlaceholderImage>
        </BoardItem>
        <MemberItem
          onClick={() => {
            navi(`/member`);
          }}
        >
          멤버
          <PlaceholderImage />
        </MemberItem>
        <FeeItem
          onClick={() => {
            navi(`/dues`);
          }}
        >
          회비
          <PlaceholderImage />
        </FeeItem>
      </GridContainer>
    </StyledHomeMain>
  );
};

export default HomeMain;
