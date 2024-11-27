import theme from '@/styles/theme';
import styled from 'styled-components';

const LineStyle = styled.div`
  width: 325px;
  height: 1px;
  background-color: ${theme.color.grayScale.gray30};
  margin: 0 auto;
`;

const Line = () => {
  return <LineStyle />;
};

export default Line;
