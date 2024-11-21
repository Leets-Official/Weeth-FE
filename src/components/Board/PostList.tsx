import theme from '@/styles/theme';
import styled from 'styled-components';
import mockBoard from '../mockData/mockBoard';
import PostListItem from './PostListItem';

const Container = styled.div`
  margin: 5px 25px 0 25px;
`;
const Line = styled.div`
  border: 1px solid;
  color: ${theme.color.grayScale.gray30};
  margin-top: 10px;
`;

const PostList = () => {
  return (
    <Container>
      {mockBoard.map((post, index) => (
        <div key={index}>
          <PostListItem
            name={post.name}
            time={post.time}
            title={post.title}
            content={post.content}
            totalComments={post.totalComments}
          />
          <Line />
        </div>
      ))}
    </Container>
  );
};

export default PostList;
