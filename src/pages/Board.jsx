import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NoticeComponent from '../components/Board/NoticeComponent';
import StudyComponent from '../components/Board/StudyComponent';
import NoticeHeader from '../components/Board/NoticeHeader';
import NoticeMiddle from '../components/Board/NoticeMiddle';
import theme from '../styles/theme';
import { BoardContext } from '../hooks/BoardContext';

const Container = styled.div`
  width: 370px;
`;

const TabsContainer = styled.div`
  display: flex;
  width: 88%;
  border-bottom: 1px solid ${theme.color.grayScale.gray65};
  margin: 0 7%;
`;

const Tab = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  font-family: ${theme.font.family.pretendard_semiBold};
  font-weight: 600;
  font-size: 16px;
  line-height: 19.09px;
  color: ${(props) =>
    props.active ? theme.color.grayScale.white : theme.color.grayScale.gray65};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) =>
      props.active ? theme.color.grayScale.white : 'transparent'};
  }
`;

const PostingButton = styled.button`
  width: calc(370px * 0.13);
  height: 28px;
  background-color: ${theme.color.main.mainColor};
  color: ${theme.color.grayScale.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 12px;
  line-height: 14.32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Define onMenuClick function
const onMenuClick = () => {
  // Menu click handler logic here
  console.log('Menu clicked');
};

const Board = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('notice');
  const [studyComponents, setStudyComponents] = useState([]);

  const { boardData, error } = useContext(BoardContext);

  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem('studyComponents')) || [];
    setStudyComponents(storedComponents);
  }, []);


  useEffect(() => {
    localStorage.setItem('studyComponents', JSON.stringify(studyComponents));
  }, [studyComponents]);

  const buttonElement = activeTab === 'study' ? <PostingButton>글쓰기</PostingButton> : undefined;

  return (
    <Container>
      <NoticeHeader showModal={false} onMenuClick={onMenuClick} />
      <NoticeMiddle
        title={activeTab === 'notice' ? '공지사항' : '스터디 게시판'}
        button={buttonElement}
      />
      <TabsContainer>
        <Tab active={activeTab === 'notice'} onClick={() => setActiveTab('notice')}>
          공지사항
        </Tab>
        <Tab active={activeTab === 'study'} onClick={() => setActiveTab('study')}>
          스터디 게시판
        </Tab>
      </TabsContainer>
      {activeTab === 'notice' && (
        <NoticeComponent
          noticeTitle="공지사항 제목"
          noticeContent="공지사항 내용"
        />
      )}
      {activeTab === 'study' && (
        <>
          {boardData ? (
            boardData.map((component, index) => (
              <StudyComponent
                key={index}
                studyTitle={component.studyTitle}
                studyContent={component.studyContent}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
          {error && <div>{error}</div>}
        </>
      )}
    </Container>
  );
};

export default Board;
