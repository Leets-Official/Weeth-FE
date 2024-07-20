import styled from 'styled-components';
import theme from '../../styles/theme';
import Caption from '../Caption';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: ${theme.font.family.pretendard_semiBold};
  color: ${theme.color.grayScale.white};
`;

const StyledBox = styled.div`
  background-color: ${theme.color.grayScale.gray18};
  border-radius: 10px;
  padding: 4%;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 90%;
`;

const SmallStyledBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const SmallStyledBox = styled.div`
  background-color: ${theme.color.grayScale.gray20};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  text-align: center;
  margin: 0 2%; /* 각 박스 사이의 간격을 4%로 설정 (양쪽에 2%씩) */
  box-sizing: border-box; /* 박스 사이즈를 포함하여 간격을 조절 */
`;

const MeetingInfoBox = styled.div`
  background-color: ${theme.color.grayScale.gray18};
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const AttendCheckMain = () => {
  return (
    <Container>
      <div>김위드 님의 출석횟수</div>
      <div>3회</div>
      <StyledBox>
        <SmallStyledBoxContainer>
          <SmallStyledBox>
            <div>정기모임</div>
            <div>8회</div>
          </SmallStyledBox>
          <SmallStyledBox>
            <div>출석</div>
            <div>3회</div>
          </SmallStyledBox>
          <SmallStyledBox>
            <div>결석</div>
            <div>1회</div>
          </SmallStyledBox>
        </SmallStyledBoxContainer>
        <MeetingInfoBox>
          <Caption />
          <div>1주차: 개강총회</div>
          <div>날짜: 2024년 7월 18일 (19:00 - 20:30)</div>
          <div>장소: 가천관 247호</div>
        </MeetingInfoBox>
        <MeetingInfoBox>
          <Caption />
          <div>2주차: 미션1 시작</div>
          <div>날짜: 2024년 7월 25일 (19:00 - 20:30)</div>
          <div>장소: 가천관 247호</div>
        </MeetingInfoBox>
        <MeetingInfoBox>
          <Caption />
          <div>3주차: 미션2 시작</div>
          <div>날짜: 2024년 8월 1일 (19:00 - 20:30)</div>
          <div>장소: 가천관 247호</div>
        </MeetingInfoBox>
        <MeetingInfoBox>
          <Caption />
          <div>4주차: 미션3 시작</div>
          <div>날짜: 2024년 8월 8일 (19:00 - 20:30)</div>
          <div>장소: 가천관 247호</div>
        </MeetingInfoBox>
      </StyledBox>
    </Container>
  );
};

export default AttendCheckMain;
