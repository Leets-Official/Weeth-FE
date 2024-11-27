import styled from 'styled-components';
import { useContext } from 'react';
import { GetAllPostsContext } from '@/api/GetAllPostsContext';
import PostListItem from '@/components/Board/PostListItem';

// 날짜 포매팅 함수
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

const Container = styled.div`
  margin: 5px 25px 0 25px;
`;
const Line = styled.div`
  border: 1px solid;
  color: ${(props) => props.theme.color.grayScale.gray30};
  margin-top: 10px;
`;

const PostList = () => {
  const { posts } = useContext(GetAllPostsContext);

  return (
    <Container>
      {posts.map((post) => (
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
