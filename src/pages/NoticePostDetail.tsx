import { useState } from 'react';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUserName from '@/hooks/useGetUserName';
import MenuModal from '@/components/common/MenuModal';
import theme from '@/styles/theme';
import DeleteModal from '@/components/Modal/DeleteModal';
import deletePost from '@/api/deletePost';
import { toastError, toastInfo } from '@/components/common/ToastMessage';

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
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 370px;
  z-index: 10;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const TextButton = styled.div<{ $isLast?: boolean }>`
  width: calc(100% - 8px);
  box-sizing: border-box;
  padding: 12px 0 12px 16px;
  margin: 0 4px;
  border-bottom: ${(props) =>
    props.$isLast ? 'none' : `1px solid ${theme.color.gray[30]}`};
  color: ${(props) => (props.$isLast ? theme.color.negative : 'white')};
`;

const NoticePostDetail = () => {
  const path = 'notices';
  const { postId } = useParams();

  const numericPostId = postId ? parseInt(postId, 10) : null;

  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const [refreshKey, setRefreshKey] = useState(0);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { boardDetailInfo, error } = useGetBoardDetail(
    path,
    numericPostId,
    refreshKey,
  );

  const navigate = useNavigate();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(numericPostId, path);
      toastInfo('게시물이 삭제되었습니다');
      setTimeout(() => {
        navigate('/notice'); // 2초 후 공지지 목록 페이지로 이동
      }, 2000);
    } catch (err) {
      toastError('에러가 발생했습니다.');
      console.error(err);
    }
    closeDeleteModal();
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setParentCommentId(null);
  };

  const isMyPost = boardDetailInfo?.name === useGetUserName();

  if (error) return <div>오류: {error}</div>;

  return (
    <>
      {isModalOpen && (
        <MenuModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          top={55}
          right={20}
        >
          <TextButton onClick={() => navigate(`/board/${postId}/edit`)}>
            수정
          </TextButton>
          <TextButton $isLast onClick={openDeleteModal}>
            삭제
          </TextButton>
        </MenuModal>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          title="게시물 삭제"
          content="이 게시물을 정말 삭제하시겠습니까?"
          onClose={closeDeleteModal}
          onDelete={confirmDelete}
        />
      )}

      <Container>
        <Header
          RightButtonType="MENU"
          isAccessible={isMyPost}
          onClickRightButton={() => {
            setIsModalOpen(true);
          }}
        >
          게시판
        </Header>

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

export default NoticePostDetail;
