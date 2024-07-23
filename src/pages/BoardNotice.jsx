import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeComponent from '../components/Board/NoticeComponent';
import NoticeHeader from '../components/Board/NoticeHeader';
import NoticeMiddle from '../components/Board/NoticeMiddle';
import theme from '../styles/theme';

const NoticeContainer = styled.div`
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
  width: 52px;
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

const BoardNotice = () => {
  const [activeTab, setActiveTab] = useState('notice');

  return (
    <NoticeContainer>
      <NoticeHeader />
      <NoticeMiddle
        title={activeTab === 'notice' ? '공지사항' : '스터디 게시판'}
        button={activeTab === 'board' && <PostingButton>글쓰기</PostingButton>}
      />
      <TabsContainer>
        <Tab
          active={activeTab === 'notice'}
          onClick={() => setActiveTab('notice')}
        >
          공지사항
        </Tab>
        <Tab
          active={activeTab === 'board'}
          onClick={() => setActiveTab('board')}
        >
          스터디 게시판
        </Tab>
      </TabsContainer>
      {activeTab === 'notice' && (
        <NoticeComponent
          styledName="홍길동"
          subTitle="공지사항"
          content="공지사항 내용"
        />
      )}
      {activeTab === 'board' && (
        <NoticeComponent
          styledName="작성자"
          subTitle="스터디 제목"
          content="스터디 내용"
        />
      )}
    </NoticeContainer>
  );
};

export default BoardNotice;
