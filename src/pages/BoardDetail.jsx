import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BoardHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
import BoardComment from '../components/Board/BoardComment';
import Typing from '../components/Board/Typing';
import { ReactComponent as BoardChat } from '../assets/images/ic_board_chat.svg';
import theme from '../styles/theme';
import { BoardContext } from '../hooks/BoardContext';
import BoardAPI from '../hooks/BoardAPI'; // BoardAPI 가져오기
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
  margin-left: 7%;
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
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const { boardData, error } = useContext(BoardContext);
  const navigate = useNavigate();
  const { id: postId } = useParams();

  // const location = useLocation();
  // const { studyTitle, studyContent } = location.state || {
  //   studyTitle: '',
  //   studyContent: '',
  // };

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(storedComments);

    const storedCommentCount = localStorage.getItem('commentCount');
    if (storedCommentCount !== null) {
      setCommentCount(parseInt(storedCommentCount, 10)); // radix 추가
    } else {
      setCommentCount(storedComments.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
    localStorage.setItem('commentCount', comments.length.toString());
    setCommentCount(comments.length);
  }, [comments]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRegisterComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleModifyClick = async () => {
    try {
      const url = `http://13.125.78.31:8080/posts/${postId}`;
      const formData = new FormData();

      // JSON 데이터는 Blob으로 추가
      const requestPostDTO = {
        title: postId.title,
        content: postId.content,
      };
      formData.append(
        'requestPostDTO',
        new Blob([JSON.stringify(requestPostDTO)], {
          type: 'application/json',
        }),
      );

      // 파일 추가
      const files = []; // 여기에 업로드할 파일들을 추가합니다.
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const validatedResponse = await Utils(response, axios.post, [
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'multipart/form-data',
          },
        },
        navigate,
      ]);

      if (validatedResponse.status === 200) {
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

  const handleDeleteClick = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(
          `http://13.125.78.31:8080/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          },
        );

        const validatedResponse = await Utils(
          response,
          axios.delete,
          [
            `http://13.125.78.31:8080/posts/${postId}`,
            {
              headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
              },
            },
          ],
          navigate,
        );

        if (validatedResponse.status === 200) {
          console.log(response);
          alert('삭제가 완료되었습니다.');
          navigate('/board');
        } else {
          console.error('삭제 실패:', validatedResponse.status);
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (err) {
        console.error('삭제 오류:', err);
        alert('삭제 도중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleMenuClick = (action) => {
    switch (action) {
      case 'edit':
        handleModifyClick();
        break;
      case 'delete':
        handleDeleteClick();
        break;
      default:
        break;
    }
  };

  const handleFileChange = (file) => {
    console.log('File changed:', file);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const post =
    boardData && boardData.find((item) => item.id === parseInt(postId, 10)); // boardData 유효성 검사 추가

  return (
    <Container>
      <HeaderWrapper>
        <BoardHeader
          onMenuClick={handleMenuClick} // onMenuClick prop을 전달합니다.
          showModal={false}
        />
      </HeaderWrapper>
      <StudyRow>
        <TextContainer>
          <StudyNamed>{post.title}</StudyNamed>
          <SubRow>
            <UserName>{post.username}</UserName>
            <StyledDate>{post.date}</StyledDate>
          </SubRow>
          <StudyContents>{post.content}</StudyContents>
        </TextContainer>
        <ComponentRow>
          <AttachButton filetype="HWP" onFileChange={handleFileChange} />
          <AttachButton filetype="PDF" onFileChange={handleFileChange} />
          <RightMargin />
        </ComponentRow>
        <BottomRow>
          <BoardChat alt="" />
          <CommentCount>{commentCount}</CommentCount>
        </BottomRow>
        <BoardComment comments={comments} recomments={[]} />
      </StudyRow>
      <Typing
        comment={comment}
        handleCommentChange={handleCommentChange}
        handleRegisterComment={handleRegisterComment}
      />
      <BoardAPI />
      {/* BoardAPI 컴포넌트를 추가하여 게시물 데이터를 불러옵니다. */}
    </Container>
  );
};

export default BoardDetail;
