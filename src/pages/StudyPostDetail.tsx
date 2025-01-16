import { useState } from 'react';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useGetUserName from '@/hooks/useGetUserName';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 370px;
  z-index: 10;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const StudyPostDetail = () => {
  const path = 'posts';
  const { postId } = useParams();

  // postId를 숫자로 변환
  const numericPostId = postId ? parseInt(postId, 10) : null;

  // postId가 유효하지 않으면 에러 처리
  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const [refreshKey, setRefreshKey] = useState(0);

  // 대댓글 작성시 부모 댓글 ID 상태
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);

  // refreshKey를 의존성으로 사용
  const { boardDetailInfo, error } = useGetBoardDetail(
    path,
    numericPostId,
    refreshKey,
  );

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const isMyPost = boardDetailInfo?.name === useGetUserName();

  if (error) return <div>오류: {error}</div>;

  return (
    <>
      <Container>
        <Header
          title="게시판"
          RightButtonType="MENU"
          isAccessible={isMyPost}
          onClickRightButton={() => console.log('모달 열림')}
        />

        {boardDetailInfo && (
          <>
            <PostDetailMain info={boardDetailInfo} />
            <PostCommentList
              comments={boardDetailInfo.comments}
              postId={boardDetailInfo.id}
              path={path}
              onCommentDelete={handleRefresh}
              onReply={(commentId) => setParentCommentId(commentId)}
            />
          </>
        )}
      </Container>
      <CommentInputContainer>
        {boardDetailInfo && (
          <CommentInput
            postId={boardDetailInfo.id}
            parentCommentId={parentCommentId}
            onCommentSuccess={handleRefresh}
          />
        )}
      </CommentInputContainer>
    </>
  );
};

export default StudyPostDetail;
