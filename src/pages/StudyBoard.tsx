import Info from '@/components/Board/Info';
import styled from 'styled-components';
import PostList from '@/components/Board/PostList';
import NoticeHeader from '@/components/Board/NoticeHeader';
import EditDelModal from '@/components/Modal/EditDelModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const StudyBoard = () => {
  // 스터디 게시판은 항상 글쓰기 버튼이 보이도록
  const isPostBtn = true;

  return (
    <Container>
      <NoticeHeader
        showModal={false}
        ModalComponent={EditDelModal}
        showIndexButton={false}
      />
      <Info title="스터디 게시판" isbutton={isPostBtn} />
      <PostList />
    </Container>
  );
};

export default StudyBoard;
