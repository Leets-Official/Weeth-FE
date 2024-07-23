import styled from 'styled-components';
import NoticeHeader from '../components/Board/NoticeHeader';
import theme from '../styles/theme';

const Container = styled.div`
  width: 370px;
`;

const AttachButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 98px;
  height: 56px;
  background-color: #0e9871;
  border-radius: 5px;
  color: ${theme.color.grayScale.white};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken(#0e9871, 10%);
  }
`;

const Board = () => {
  return (
    <Container>
      <NoticeHeader />
      <AttachButton />
    </Container>
  );
};

export default Board;
