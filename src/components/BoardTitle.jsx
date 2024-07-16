import styled from 'styled-components';
import LeftButton from './LeftButton';
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

const BoardTitle = () => {
  return (
    <Title>
      <StyledHeader>
        <LeftButton />
        <RightButton text="⋮" />
      </StyledHeader>
      <h2>중간 발표</h2>
      <Detail>
        <div>게시자</div>
        <div>2024/06/10 18:32</div>
      </Detail>
    </Title>
  );
};

export default BoardTitle;
