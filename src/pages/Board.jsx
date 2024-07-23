import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import BoardHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
import BoardComment from '../components/Board/BoardComment';
import { ReactComponent as BoardChat } from '../assets/images/ic_board_chat.svg';
import { ReactComponent as RegisterComment } from '../assets/images/ic_send.svg';
import theme from '../styles/theme';

const Container = styled.div`
  width: 370px;
  max-width: 370px;
  color: ${theme.color.grayScale.white};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 370px;
  background-color: ${theme.color.grayScale.black}; /* Header 배경 색상 추가 */
  top: 0;
  z-index: 1;
`;

const BoardRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 6%;
  margin-top: 90px;
`;

// const ScrollableContent = styled.div`
//   flex: 1;
//   overflow-y: auto;
//   padding-top: 60px; /* 고정된 헤더 아래에 콘텐츠가 표시되도록 충분한 여백 추가 */
//   padding-bottom: ${({ paddingBottom }) => paddingBottom}px;
// `;

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

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
  margin-left: 4px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  border-bottom: 1px solid ${theme.color.grayScale.gray30};
  padding-bottom: 10px; /* 선 아래 여백 추가 */
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 81%;
  margin: 10px 0 0 10%;
`;

const InputField = styled.input`
  width: 100%;
  height: 37px;
  color: ${theme.color.grayScale.white};
  background-color: ${theme.color.main.mainColor};
  border: none;
  border-radius: 15px;
  font-size: 14px;
  font-family: ${theme.font.family.pretendard_semiBold};
  weight: 600;
  outline: none;
  padding: 0 48% 0 5%;

  &::placeholder {
    color: ${theme.color.grayScale.white};
  }
`;

const StyledRegisterComment = styled(RegisterComment)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Board = () => {
  const divRef = useRef(null);

  useEffect(() => {
    const handleVisualViewPortResize = () => {
      const currentVisualViewport = Number(window.visualViewport?.height);
      if (divRef.current) {
        divRef.current.style.height = `${currentVisualViewport - 30}px`;
        window.scrollTo(0, 40);
      }
    };

    // 초기 실행
    handleVisualViewPortResize();

    // resize 이벤트 리스너 추가
    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        'resize',
        handleVisualViewPortResize,
      );
    }

    // cleanup 함수로 이벤트 리스너 제거
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          'resize',
          handleVisualViewPortResize,
        );
      }
    };
  }, []);

  return (
    <Container>
      <HeaderWrapper>
        <BoardHeader />
      </HeaderWrapper>
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
        <BottomRow>
          <BoardChat />
          <CommentCount>3</CommentCount>
        </BottomRow>
        <BoardComment />
      </BoardRow>
      <InputWrapper>
        <InputField placeholder="댓글을 입력하세요." />
        <StyledRegisterComment />
      </InputWrapper>
    </Container>
  );
};

export default Board;
