import { useState } from 'react';
import Modal from 'react-modal';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUserName from '@/hooks/useGetUserName';
import EditDelModal from '@/components/Modal/EditDelModal';

Modal.setAppElement('#root');

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

const NoticePostDetail = () => {
  const path = 'notices';
  const { postId } = useParams();

  const numericPostId = postId ? parseInt(postId, 10) : null;

  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const [refreshKey, setRefreshKey] = useState(0);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);

  const { boardDetailInfo, error } = useGetBoardDetail(
    path,
    numericPostId,
    refreshKey,
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navi = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onClickEdit = () => {
    console.log('수정 페이지로 이동');
    navi('/notices/edit'); // 수정 페이지로 이동
  };

  const onClickDel = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        console.log('삭제 API 호출');
        // API 호출 예시
        // await deletePost(postId);
        alert('삭제가 완료되었습니다.');
        navi('/notice'); // 공지사항 목록 페이지로 이동
      } catch (err) {
        alert('삭제 중 오류가 발생했습니다.');
        console.error(err);
      }
    }
  };
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setParentCommentId(null);
  };

  const isMyPost = boardDetailInfo?.name === useGetUserName();

  if (error) return <div>오류: {error}</div>;

  return (
    <>
      <Container>
        <Header
          title="📢 공지사항"
          RightButtonType="MENU"
          isAccessible={isMyPost}
          onClickRightButton={openModal}
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

      {/* 모달 컴포넌트 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
          content: {
            background: 'transparent',
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            border: 'none',
          },
        }}
      >
        <EditDelModal
          title="공지사항"
          onClickEdit={onClickEdit}
          onClickDel={onClickDel}
          onClickCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default NoticePostDetail;
