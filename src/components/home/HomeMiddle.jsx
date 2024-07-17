import styled from 'styled-components';
import Caption from '../Caption';
import RightButton from '../Header/RightButton';
import './HomeMiddle.css';
import theme from '../../styles/theme';

const StyledHomeMiddle = styled.div`
  margin-top: 40px;
  margin-left: -20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: fit-content;
  padding: 10px;
  position: relative;
`;

const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    'calendar penalty'
    'calendar penalty'
    'board member'
    'board fee';
  gap: 10px;
  margin-top: 20px;
  margin-row: 50px;
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
  background-color: #555;
  width: 60px;
  height: 60px;
  border-radius: 5px;
  align-self: flex-end;
  justify-self: flex-start;
`;

const HomeMiddle = () => {
  return (
    <StyledHomeMiddle>
      <Caption color="#ffffff" textColor="#000000">
        3기
      </Caption>
      <div className="user-info">
        <div className="name">김위드</div>
        <div className="nick-name">Elite님</div>
        <div className="right-button">
          <RightButton text=">" />
        </div>
      </div>
      <GridContainer>
        <CalendarItem>
          동아리
          <br />
          일정 캘린더
          <PlaceholderImage />
        </CalendarItem>
        <PenaltyItem>
          출석 패널티
          <PlaceholderImage />
        </PenaltyItem>
        <BoardItem>
          게시판
          <PlaceholderImage />
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
