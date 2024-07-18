import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Caption from '../Caption';
import RightButton from '../Header/RightButton';
import './HomeMain.css';
import theme from '../../styles/theme';

import calendar from '../../assets/images/ic_home_calendar.png';
import attend from '../../assets/images/ic_home_attend.png';
import board from '../../assets/images/ic_home_board.png';

const StyledHomeMiddle = styled.div`
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
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    'calendar penalty'
    'calendar penalty'
    'board member'
    'board fee';
  gap: 10px;
`;

const GridItem = styled.div`
  background-color: ${({ color }) => color || theme.color.grayScale.gray18};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 18px;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

const FeeItem = styled(GridItem)`
  grid-area: fee;
`;

const PlaceholderImage = styled.div`
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

const HomeMiddle = () => {
  const navi = useNavigate();
  return (
    <StyledHomeMiddle>
      <CaptionContainer>
        <Caption color="#ffffff" textColor="#000000">
          3기
        </Caption>
      </CaptionContainer>
      <div className="user-info">
        <div className="user-container">
          <div className="name">김위드</div>
          <div className="nick-name">Elite님</div>
        </div>
        <div className="right-button">
          <RightButton text=">" />
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
        <MemberItem>
          멤버
          <PlaceholderImage />
        </MemberItem>
        <FeeItem>
          회비
          <PlaceholderImage />
        </FeeItem>
      </GridContainer>
    </StyledHomeMiddle>
  );
};

export default HomeMiddle;
