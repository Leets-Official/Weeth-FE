import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from '../Header/LeftButton';
// import IndexButton from '../Header/IndexButton';
import TextButton from '../Header/TextButton';
import theme from '../../styles/theme';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

/*
오른쪽 버튼이 없어서 정렬이 안 맞을 경우에는
TitleWrapper 스타일 사용~!
*/
// const TitleWrapper = styled.div`
//   // position: absolute;
//   // left: 50%;
//   // transform: translateX(-50%);
// `;

/*
LeftButton은 모든 페이지에서 동일하게 사용되어 props를 설정하지 않았음

IndexButton(⋮)과 Text버튼(글자 입력 가능) 중 한가지만 선택하여 사용
두개의 버튼 모두 onClick 함수를 props로 받습니다

TextButton Props
onClick
text : 버튼에 나타날 글자를 입력
color : 버튼의 색상을 선택, 아무것도 설정하지 않으면 흰색,
        mainColor은 대표색상인 #00DDA8로 나타납니다

onClick은 아래 함수에 각각의 함수를 작성
버튼에게 할당된 클릭 이벤트가 없을 때(가 없겟지만..)
()=>{}로 선언만 해두면 됨
@@@@안 하면 에러남@@@@
*/

// const onClickIndexButton = () => {};
// const onClickTextButton = () => {};

const LoginHeader = ({ isRightButtonEnabled }) => {
  const [buttonColor, setButtonColor] = useState(
    isRightButtonEnabled
      ? theme.color.main.mainColor
      : theme.color.grayScale.white,
  );

  const onClickTextButton = () => {
    setButtonColor(theme.color.main.mainColor); // 버튼 클릭 시 색상을 초록색으로 변경
  };

  return (
    <StyledHeader>
      <LeftButton />
      <TextButton text="완료" color={buttonColor} onClick={onClickTextButton} />
    </StyledHeader>
  );
};

LoginHeader.propTypes = {
  isRightButtonEnabled: PropTypes.bool.isRequired,
};

export default LoginHeader;
