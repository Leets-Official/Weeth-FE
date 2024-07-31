import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BoardHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
import BoardComment from '../components/Board/BoardComment';
import Typing from '../components/Board/Typing';
import { ReactComponent as BoardChat } from '../assets/images/ic_board_chat.svg';
import theme from '../styles/theme';
import Utils from '../hooks/Utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  min-height: 810px;
  color: ${theme.color.grayScale.white};
`;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 370px;
  background-color: ${theme.color.grayScale.gray12};
  top: 0;
  z-index: 1;
`;

const StudyRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 6%;
  margin-top: 90px;
  flex-grow: 1;
`;

const TextContainer = styled.div`
  margin: 0 0 7%; 10px;
  padding: 0;
`;

const StudyNamed = styled.div`
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

const StudyContents = styled.div`
  width: 88%;
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
  padding-bottom: 10px;
`;

const BoardDetail = () => {
  const { state } = useLocation();
  const { type, data } = state || { type: 'study', data: {} };
  const [content, setContent] = useState(null); // 초기값을 null로 설정

  const navigate = useNavigate();
  const { id: postId, noticeId } = useParams();

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  useEffect(() => {
    console.log('Component mounted');
    console.log('Access Token:', accessToken);
    console.log('State received from navigation:', state);
    console.log('Type:', type);
    console.log('Post ID:', postId);
    console.log('Notice ID:', noticeId);

    if (!data || Object.keys(data).length === 0) {
      const fetchData = async () => {
        try {
          const url =
            type === 'study'
              ? `${BASE_URL}/${postId}`
              : `${BASE_URL}/${noticeId}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const validatedResponse = await Utils(response, axios.get, [
            url,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
            navigate,
          ]);

          console.log('API Response:', validatedResponse.data);

          // const isValidResponse = await Utils.get(url, {
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`,
          //   },
          // });
          console.log('API Response:', response.data);
          if(validatedResponse.data.code === 200) {
            setContent(validatedResponse.data.data);
            setCommentCount(validatedResponse.data.data.totalComments || 0);
          } else {
            console.error('API response error:', validatedResponse.data.message);
          }
        } catch (error) {
          console.error('데이터 가져오기 실패:', error);
        }
      };
  
      fetchData();
    } else {
      setContent(data);
    }
  }, [accessToken, type, postId, noticeId, data]);

  // 게시글 수정
  const handleModifyClick = async () => {
    try {
      const url = `${BASE_URL}/${postId}`;
      const formData = new FormData();

      const requestPostDTO = {
        title: content.title,
        content: content.data,
      };
      formData.append(
        'requestPostDTO',
        new Blob([JSON.stringify(requestPostDTO)], {
          type: 'application/json',
        }),
      );

      const files = [];
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const validatedResponse = await Utils(response, axios.post, [
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        },
        navigate,
      ]);

      if (validatedResponse.data.code === 0) {
        console.log('modify :', response);
        navigate('/BoardPosting');
      } else {
        console.error('수정 실패:', validatedResponse.status);
        alert('수정에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('수정 오류:', err);
      alert('수정 도중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 게시글 삭제
  const handleDeleteClick = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        console.log('삭제 요청을 시작합니다...'); // 삭제 요청 시작 로그
        const response = await axios.delete(
          `${BASE_URL}/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log('서버로부터 받은 응답:', response); // 서버 응답 로그

        const validatedResponse = await Utils(
          response,
          axios.delete,
          [
            `${BASE_URL}/posts/${postId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          ],
          navigate,
        );

        console.log('유효성 검사 후 응답:', validatedResponse); // 유효성 검사 후 응답 로그

        if (validatedResponse.data.code === 200) {
          console.log('삭제가 성공적으로 완료되었습니다.'); // 삭제 성공 로그
          alert('삭제가 완료되었습니다.');
          navigate('/board');
        } else {
          console.error('삭제 실패:', validatedResponse.data.message); // 삭제 실패 로그
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (err) {
        console.error('삭제 요청 중 오류 발생:', err); // 오류 발생 로그
        alert('삭제 도중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleMenuClick = (action) => {
    switch (action) {
      case 'edit':
        console.log('Edit clicked');
        break;
      case 'delete':
        handleDeleteClick();
        break;
      default:
        break;
    }
  };

  // 댓글 등록

  const handleRegisterComment = async () => {
    try {
      const url = `${BASE_URL}/${postId}/comments`;
      const response = await axios.post(
        url,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.code === 200) {
        setRecomments((prevRecomments) => [...prevRecomments, response.data.data]);
        setComment('');
      } else {
        alert('댓글 등록에 실패했습니다.');
      }
    } catch (error) {
      alert('댓글 등록 중 오류가 발생했습니다.');
    }
  };


  const handleFileChange = (file) => {
    console.log('File changed:', file);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Container>
      <HeaderWrapper>
      <BoardHeader onMenuClick={handleMenuClick} showModal={false} />
      </HeaderWrapper>
      <StudyRow>
        <TextContainer>
          {content ? (
            <>
              <StudyNamed>{content?.title || 'Loading...'}</StudyNamed>
              <SubRow>
                <UserName>{content?.name || content?.userName || 'Unknown'}</UserName>
                <StyledDate>{content?.time || content?.createAt|| '00/00 00:00'}</StyledDate>
              </SubRow>
              <StudyContents>{content?.content || 'Loading...'}</StudyContents>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </TextContainer>
        <ComponentRow>
        {content && content.fileUrls ? (
            content.fileUrls.map((file) => (
              <AttachButton key={file.id} filetype={file.filetype} onFileChange={handleFileChange} />
            ))
          ) : (
            <p>No files attached</p>
          )}
          <RightMargin />
        </ComponentRow>
        <BottomRow>
          <BoardChat alt="" />
          <CommentCount>{content?.totalComments || 0}</CommentCount>
        </BottomRow>
        <BoardComment 
          comments={content?.comments?.length > 0 ? content.comments : [{ text: 'No comments yet.' }]} 
          recomments={[]} 
        />

      </StudyRow>
      <Typing
        comment={content?.comment || ''}
        handleCommentChange={handleCommentChange}
      />

    </Container>
  );
};

export default BoardDetail;