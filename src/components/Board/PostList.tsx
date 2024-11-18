import theme from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  margin: 5px 25px 0 25px;
`;
const Line = styled.div`
  border: 1px solid;
  color: ${theme.color.grayScale.gray30}; 
`;

const PostList = () => {
  return <Container />;
};

export default PostList;
