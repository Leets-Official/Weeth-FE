import React, { useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import NoticeHeader from '../components/Board/NoticeHeader';
import NoticeMiddle from '../components/Board/NoticeMiddle';
import NoticeList from '../components/Board/NoticeList';
import StudyList from '../components/Board/StudyList';
import AdminEditDelModal from '../components/AdminEditDelModal';
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
  line-height: 14.32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* const onMenuClick = () => {
  console.log('Menu clicked');
}; */

const Board = () => {
  const [activeTab, setActiveTab] = useState('notice');
  const buttonElement =
    activeTab === 'study' ? <PostingButton>글쓰기</PostingButton> : <div />;
  // const [noticeList, setNoticeList] = useState([]);
  // const [noticeList, setNoticeList] = useState([]);

  // const AdminhandleModifyClick = () => {
  //   console.log('수정');
  // };

  // const AdminhandleDeleteClick = () => {
  //   console.log('삭제');
  // };

  const handleMenuClick = (action) => {
    if (action === 'edit') {
      console.log('수정');
    } else if (action === 'delete') {
      console.log('삭제');
    }
  };

  return (
    <Container>
      <NoticeHeader
        showModal={false}
        onMenuClick={handleMenuClick}
        ModalComponent={AdminEditDelModal} // AdminEditModal을 사용
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
