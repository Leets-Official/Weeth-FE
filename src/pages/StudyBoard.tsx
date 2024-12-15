import Info from '@/components/Board/Info';
import styled from 'styled-components';
import PostListItem from '@/components/Board/PostListItem';
import NoticeHeader from '@/components/Board/NoticeHeader';
import EditDelModal from '@/components/Modal/EditDelModal';
import formatDate from '@/hooks/formatDate';
import useGetBoardInfo from '@/api/useGetBoardInfo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;
const Line = styled.div`
  border: 1px solid;
  color: ${(props) => props.theme.color.gray[30]};
  margin-top: 10px;
`;
const PostList = styled.div`
  margin: 5px 25px 0 25px;
`;

const StudyBoard = () => {
  // 스터디 게시판은 항상 글쓰기 버튼이 보이도록
  const isPostBtn = true;

  const { boardInfo, error } = useGetBoardInfo('posts', 0);

  if (error) {
    return <div>{error}</div>;
  }

  if (!boardInfo) {
    return <div>Loading</div>;
  }

  console.log(boardInfo);

  return (
    <Container>
      <NoticeHeader showModal={false} ModalComponent={EditDelModal} />
      <Info title="스터디 게시판" isEditButtonVisible={isPostBtn} />
      {boardInfo.content.map((post) => (
        <PostList key={post.id}>
          <PostListItem
            name={post.name}
            time={formatDate(post.time)}
            title={post.title}
            content={post.content}
            totalComments={post.commentCount}
          />
          <Line />
        </PostList>
      ))}
    </Container>
  );
};

export default StudyBoard;
