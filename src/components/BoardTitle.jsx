import styled from 'styled-components';
import RightButton from './RightButton';

const Title = styled.div`
  margin: 10px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Detail = styled.div`
  display: flex;

  div {
    margin-right: 10px;
  }
`;

const Line = styled.div`
  border: 1px solid;
  margin-top: 10px;
  transform: scaleY(0.2);
`;

const BoardTitle = () => {
  return (
    <Title>
      <StyledHeader>
        <RightButton text="⋮" />
      </StyledHeader>
      <h2>중간 발표</h2>
      <Detail>
        <div>게시자</div>
        <div>2024/06/10 18:32</div>
      </Detail>
      <Line />
    </Title>
  );
};

export default BoardTitle;
