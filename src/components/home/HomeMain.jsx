import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Caption from '../Caption';
import RightButton from '../Header/RightButton';
import './HomeMain.css';
import theme from '../../styles/theme';

const StyledHomeMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    'calendar penalty'
    'calendar penalty'
    'board member'
    'board fee';
  gap: 10px;
  margin-top: 20px;
`;

const GridItem = styled.div`
  background-color: ${({ color }) => color || theme.color.grayScale.gray18};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 20px;
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
  background-color: ${({ color }) => color || theme.color.grayScale.gray18};
  width: 90px;
  height: 90px;
  border-radius: 5px;
  align-self: flex-end;
  justify-self: flex-start;
`;

const HomeMiddle = () => {
  const navi = useNavigate();
  return (
    <StyledHomeMiddle>
      <Caption color="#ffffff" textColor="#000000">
        3기
      </Caption>
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
            <img src="public\images\ic_home_attend.png" alt="캘린더 이미지" />
          </PlaceholderImage>
        </CalendarItem>
        <PenaltyItem
          onClick={() => {
            navi(`/attendance`);
          }}
        >
          출석 패널티
          <PlaceholderImage>
            <img
              src="../../assets/images/ic_home_attend.png"
              alt="출석 이미지"
            />
          </PlaceholderImage>
        </PenaltyItem>
        <BoardItem
          onClick={() => {
            navi(`/board`);
          }}
        >
          게시판
          <PlaceholderImage>
            <img
              src="../../assets/images/ic_home_board.png"
              alt="게시판 이미지"
            />
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
