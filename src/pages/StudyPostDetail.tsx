import useGetBoardDetail from '@/api/useGetBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import styled from 'styled-components';

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
  const openModal = () => {
    console.log('모달 열림');
  };

  // useGetBoardDetail 훅 호출
  const { boardDetailInfo, error } = useGetBoardDetail('posts', 65);

  if (error) return <div>오류: {error}</div>;

  return (
    <>
      <Container>
        <Header
          title="게시판"
          RightButtonType="MENU"
          isAccessible
          onClickRightButton={openModal}
        />
        {boardDetailInfo && (
          <>
            <PostDetailMain info={boardDetailInfo} />
            <PostCommentList comments={boardDetailInfo.comments} />
          </>
        )}
      </Container>
      <CommentInputContainer>
        <CommentInput />
      </CommentInputContainer>
    </>
  );
};

export default StudyPostDetail;
