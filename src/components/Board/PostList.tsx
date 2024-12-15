import styled from 'styled-components';
import PostListItem from '@/components/Board/PostListItem';
import formatDate from '@/hooks/formatDate';
import useGetBoardInfo from '@/api/useGetBoardInfo';

const Container = styled.div`
  margin: 5px 25px 0 25px;
`;

const Line = styled.div`
  border: 1px solid;
  color: ${(props) => props.theme.color.gray[30]};
  margin-top: 10px;
`;

const PostList = ({ board }: { board: string }) => {
  const { boardInfo, error } = useGetBoardInfo(board, 0);

  if (error) {
    return <div>{error}</div>;
  }

  if (!boardInfo) {
    return <div>Loading</div>;
  }

  console.log(boardInfo);

  return (
    <Container>
      {boardInfo.content.map((post) => (
        <div key={post.id}>
          <PostListItem
            name={post.name}
            time={formatDate(post.time)}
            title={post.title}
            content={post.content}
            totalComments={post.commentCount}
          />
          <Line />
        </div>
      ))}
    </Container>
  );
};

export default PostList;
