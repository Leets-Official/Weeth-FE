import theme from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 19px;
  border-radius: 13px;
  background-color: ${theme.color.gray[65]};
  color: #000;
  font-size: 12px;
  font-family: ${theme.font.semiBold};
`;

const CardinalTag = ({ cardinal }: { cardinal: number }) => {
  return <Container>{cardinal}기</Container>;
};

export default CardinalTag;
