import styled from 'styled-components';
import LeftButton from './Header/LeftButton';
import RightButton from './Header/RightButton';

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

//  해당 함수에 온클릭 이벤트 작성
const onClickButton = () => {};

const BoardTitle = () => {
  return (
    <Title>
      <StyledHeader>
        <LeftButton onClick={onClickButton} />
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
