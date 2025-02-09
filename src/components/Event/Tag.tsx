import theme from '@/styles/theme';
import styled from 'styled-components';

const DefaultStyle = styled.div`
  width: 65px;
  height: 24px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: ${theme.font.semiBold};
`;

const Meeting = styled(DefaultStyle)`
  background-color: rgba(0, 221, 168, 0.1);
  color: ${theme.color.main};
`;

const Tag = ({ type }: { type: string }) => {
  switch (type) {
    case 'meeting':
      return <Meeting>정기 모임</Meeting>;
    // 추가 예정...
    default:
      return null;
  }
};

export default Tag;
