import styled from 'styled-components';
import BoardHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
import theme from '../styles/theme';

const Container = styled.div`
  width: 370px;
  color: ${theme.color.grayScale.white};
`;

const BoardRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 6%;
`;

const BoardName = styled.div`
  maring-left: 7%;
  font-size: 24px;
  font-weight: 600;
`;

const SubRow = styled.div`
  display: flex;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
`;

const ComponentRow = styled.div`
  display: flex;
  margin-right: 4%;
`;

const UserName = styled.div`
  padding: 0;
  margin-right: 3%;
`;

const StyledDate = styled.div`
  padding: 0;
`;

const BoardContent = styled.div`
  width: 88%;
  height: 43px;
  margin-top: 20px;
  margin-right: 4%;
  font-family: ${theme.font.family.pretendard_regular};
  weight: 400;
  font-size: 16px;
  line-height: 19.09px;
`;

const RightMargin = styled.div`
  margin-right: 27%;
`;

const Board = () => {
  return (
    <Container>
      <BoardHeader />
      <BoardRow>
        <BoardName>스터디제목</BoardName>
        <SubRow>
          <UserName>김위드</UserName>
          <StyledDate>00/00 00:00</StyledDate>
        </SubRow>
        <BoardContent>
          서비스의 주요 기능을 결정했다. <br />
          1.출석 2. 일정관리,투표 3.공지사항
        </BoardContent>
        <ComponentRow>
          <AttachButton filetype="HWP" />
          <AttachButton filetype="PDF" />
          <RightMargin />
        </ComponentRow>
      </BoardRow>
    </Container>
  );
};

export default Board;
