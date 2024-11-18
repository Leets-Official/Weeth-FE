/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EditDelModal from '@/components/Modal/EditDelModal';
import { UserContext } from '@/api/UserContext';
import NoticeHeader from '../components/Board/NoticeHeader';
import NoticeMiddle from '../components/Board/NoticeMiddle';
import NoticeList from '../components/Board/NoticeList';
import StudyList from '../components/Board/StudyList';
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

const StyledTab = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 16px;
  line-height: 19.09px;
  color: ${(props) =>
    props.active === 'true'
      ? theme.color.grayScale.white
      : theme.color.grayScale.gray65};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) =>
      props.active === 'true' ? theme.color.grayScale.white : 'transparent'};
  }
`;

const PostingButton = styled.button`
  width: calc(370 * 0.13);
  height: 28px;
  background-color: ${theme.color.main.mainColor};
  color: ${theme.color.grayScale.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Board = () => {
  const [activeTab, setActiveTab] = useState('notice');
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);


  const handlePostingClick = () => {
    if (activeTab === 'study') {
      navigate('/study/post');
    } else if (activeTab === 'notice') {
      navigate('/notice/post');
    }
  };

  const buttonElement = (() => {
    if (activeTab === 'notice' && userData && userData.role === 'ADMIN') {
      return <PostingButton onClick={handlePostingClick}>글쓰기</PostingButton>;
    }
    if (activeTab === 'study') {
      return <PostingButton onClick={handlePostingClick}>글쓰기</PostingButton>;
    }
    return null; // ADMIN이 아니고, 공지사항 탭이 선택된 경우에는 버튼을 숨김
  })();

  return (
    <Container>
      <NoticeHeader
        showModal={false}
        ModalComponent={EditDelModal}
        showIndexButton={false}
      />
      <NoticeMiddle
        title={activeTab === 'notice' ? '공지사항' : '스터디 게시판'}
        button={buttonElement}
      />
      <TabsContainer>
        <StyledTab
          active={(activeTab === 'notice').toString()}
          onClick={() => setActiveTab('notice')}
        >
          공지사항
        </StyledTab>
        <StyledTab
          active={(activeTab === 'study').toString()}
          onClick={() => setActiveTab('study')}
        >
          스터디 게시판
        </StyledTab>
      </TabsContainer>
      {activeTab === 'notice' && <NoticeList />}
      {activeTab === 'study' && <StudyList />}
    </Container>
  );
};

export default Board;
