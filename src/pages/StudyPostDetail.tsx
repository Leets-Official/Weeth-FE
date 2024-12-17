import useGetBoardDetail from '@/api/useGetBoardDetail';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const PostDetail = () => {
  const openModal = () => {
    console.log('모달 열림');
  };

  // useGetBoardDetail 훅 호출
  const { boardDetailInfo, error } = useGetBoardDetail('posts', 47);

  if (error) return <div>오류: {error}</div>; // 에러 처리

  return (
    <Container>
      <Header
        title="게시판"
        RightButtonType="MENU"
        isAccessible
        onClickRightButton={openModal}
      />
      <PostDetailMain info={boardDetailInfo} /> {/* 데이터를 전달 */}
      <PostCommentList />
    </Container>
  );
};

export default PostDetail;
