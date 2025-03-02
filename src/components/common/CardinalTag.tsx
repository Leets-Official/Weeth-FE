import theme from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div<{ type: 'member' | 'mypage' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 19px;
  border-radius: 13px;
  background-color: ${(props) =>
    props.type === 'mypage' ? theme.color.gray[30] : theme.color.gray[65]};
  color: ${(props) => (props.type === 'mypage' ? 'white' : 'black')};
  font-size: 12px;
  font-family: ${theme.font.semiBold};
`;

const CardinalTag = ({
  cardinal,
  type,
}: {
  cardinal: number;
  type: 'member' | 'mypage';
}) => {
  return <Container type={type}>{cardinal}기</Container>;
};

export default CardinalTag;
