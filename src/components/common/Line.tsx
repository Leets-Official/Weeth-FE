import theme from '@/styles/theme';
import styled from 'styled-components';

const LineStyle = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 1px;
  background-color: ${theme.color.gray[30]};
  margin: 0 auto;
`;

const Line = ({ width }: { width?: string }) => {
  return <LineStyle width={width || '325px'} />;
};

export default Line;
