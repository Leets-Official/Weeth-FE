import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BoardHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
import { BoardContext } from '../hooks/BoardContext';
import { ReactComponent as BoardChat } from '../assets/images/ic_board_chat.svg';
import theme from '../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  min-height: 810px;
  color: ${theme.color.grayScale.white};
  margin-bottom: 50px;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 370px;
  background-color: ${theme.color.grayScale.gray12};
  top: 0;
  z-index: 1;
`;

const NoticeRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 6%;
  margin-top: 90px;
  flex-grow: 1;
`;

const TextContainer = styled.div`
  margin: 0 0 7%;
  padding: 0;
`;

const NoticeNamed = styled.div`
  font-size: 24px;
`;

const SubRow = styled.div`
  display: flex;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
  font-size: 12px;
  line-height: 14.32px;
`;

const ComponentRow = styled.div`
  display: flex;
  margin-top: 10px;
  margin: 40px 4% 0 0;
`;

const UserName = styled.div`
  padding: 0;
  margin-right: 3%;
`;

const StyledDate = styled.div`
  padding: 0;
`;

const NoticeContents = styled.div`
  width: 88%;
  margin-top: 20px;
  margin-right: 4%;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  line-height: 19.09px;
`;

const RightMargin = styled.div`
  margin-right: 27%;
`;

const CommentCountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 10px;
`;

const CommentCount = styled.div`
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  line-height: 14.32px;
  margin-left: 4px;
`;

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};

const NoticeDetail = () => {
  const { id } = useParams();

  console.log('Post ID from useParams:', id);

  const noticeId = parseInt(id, 10);
  console.log('Parsed noticId:', noticeId);

  const { setError } = useContext(BoardContext);
  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/notices/${noticeId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log('API Response:', response.data); // 응답 전체를 로그로 출력

        if (response.data.code === 200) {
          setContent(response.data.data);
        } else {
          console.error('Error fetching notice data:', response.data.message);
          setError(response.data.message);
        }
      } catch (err) {
        console.error('API request error:', err);
        setError('API request error');
      }
    };
    fetchData();
  }, [noticeId, accessToken, BASE_URL, setError]);

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <HeaderWrapper>
        <BoardHeader
          onMenuClick={(action) => {
            if (action === 'delete') {
              // handleDeleteClick(); // 삭제 기능 호출 부분
            } else if (action === 'edit') {
              navigate(`/boardPosting`, {
                state: {
                  title: content.title,
                  content: content.content,
                  noticeId,
                },
              });
            }
          }}
          showModal={false}
          showIndexButton
        />
      </HeaderWrapper>
      <NoticeRow>
        <TextContainer>
          <NoticeNamed>{content?.title || 'Loading...'}</NoticeNamed>
          <SubRow>
            <UserName>{content?.name || 'Unknown'}</UserName>
            <StyledDate>
              {formatDateTime(content?.time) || '00/00 00:00'}
            </StyledDate>
          </SubRow>
          <NoticeContents>{content?.content || 'Loading...'}</NoticeContents>
        </TextContainer>
        <ComponentRow>
          {content.fileUrls ? (
            <AttachButton fileUrl={content.fileUrls[0]} />
          ) : null}
          <RightMargin />
        </ComponentRow>
        <CommentCountWrapper>
          <BoardChat alt="" />
          <CommentCount>{content.commentCount || 0}</CommentCount>
        </CommentCountWrapper>
      </NoticeRow>
    </Container>
  );
};

export default NoticeDetail;
