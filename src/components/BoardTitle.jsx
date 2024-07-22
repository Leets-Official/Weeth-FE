import styled from 'styled-components';
import LeftButton from './Header/LeftButton';
import IndexButton from './Header/IndexButton';

const StyledTitle = styled.div`
  margin: 45px 25px 20px 25px; //기본 헤더 마진
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

/*
LeftButton은 모든 페이지에서 동일하게 사용되어 다른 props를 설정하지 않았음

IndexButton(⋮)과 Text버튼(글자 입력 가능) 중 한가지만 선택하여 사용
두개의 버튼 모두 onClick 함수를 props로 받습니다

TextButton Props
onClick
text : 버튼에 나타날 글자를 입력
color : 버튼의 색상을 선택, 아무것도 설정하지 않으면 흰색,
        green은 대표색상인 #00DDA8로 나타납니다

onClick은 아래 함수에 각각의 함수를 작성
버튼에게 할당된 클릭 이벤트가 없을 때(가 없겟지만..)
()=>{}로 선언만 해두면 됨
@@@@안 하면 에러남@@@@
*/

const onClickIndexButton = () => {};

const BoardTitle = () => {
  return (
    <StyledTitle>
      <StyledHeader>
        <LeftButton />
        <IndexButton onClick={onClickIndexButton} />
      </StyledHeader>
      <h2>중간 발표</h2>
      <Detail>
        <div>게시자</div>
        <div>2024/06/10 18:32</div>
      </Detail>
    </StyledTitle>
  );
};

export default BoardTitle;
