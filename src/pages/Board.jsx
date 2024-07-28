import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NoticeComponent from '../components/Board/NoticeComponent';
import StudyComponent from '../components/Board/StudyComponent';
import NoticeHeader from '../components/Board/NoticeHeader';
import NoticeMiddle from '../components/Board/NoticeMiddle';
import theme from '../styles/theme';

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

const Board = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('notice');
  const [studyComponents, setStudyComponents] = useState([]);

  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem('studyComponents')) || [];
    setStudyComponents(storedComponents);
  }, []);


  useEffect(() => {
    localStorage.setItem('studyComponents', JSON.stringify(studyComponents));
  }, [studyComponents]);

  return (
    <Container>
      <NoticeHeader showModal={false} />
      <NoticeMiddle
        title={activeTab === 'notice' ? '공지사항' : '스터디 게시판'}
        button={
          activeTab === 'study' ? <PostingButton>글쓰기</PostingButton> : null
        }
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
          {
            [...studyComponents].reverse().map((component, index) => (
              <StudyComponent
                key={index}
                studyTitle={component.studyTitle}
                studyContent={component.studyContent}
              />
            ))}
        </>
      )}
    </Container>
  );
};

export default Board;
