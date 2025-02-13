import theme from '@/styles/theme';
import styled from 'styled-components';

const Label = styled.div`
  width: 65px;
  height: 24px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: ${theme.font.semiBold};
  background-color: rgba(0, 221, 168, 0.1);
  color: ${theme.color.main};
`;

const Tag = () => {
  return <Label>정기 모임</Label>;
};

export default Tag;
