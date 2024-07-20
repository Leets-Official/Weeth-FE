import styled from 'styled-components';
import { useState } from 'react';
import theme from '../../styles/theme';

const StyledCategory = styled.div`
  padding-top: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  height: 39px;
  width: 17%;
  border: 2px solid;
  border-width: 0 0 2px;
  border-color: ${(props) => (props.checked ? 'white' : 'transparent')};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const Category = () => {
  const [isAll, setIsAll] = useState(false);
  const [is1, setIs1] = useState(false);
  const [is2, setIs2] = useState(false);
  const [is3, setIs3] = useState(false);

  const onClickAll = () => {
    setIsAll(!isAll);
    setIs1(false);
    setIs2(false);
    setIs3(false);
  };

  const onClick1 = () => {
    setIs1(!is1);
    setIsAll(false);
    setIs2(false);
    setIs3(false);
  };

  const onClick2 = () => {
    setIs2(!is2);
    setIsAll(false);
    setIs1(false);
    setIs3(false);
  };

  const onClick3 = () => {
    setIs3(!is3);
    setIsAll(false);
    setIs1(false);
    setIs2(false);
  };

  return (
    <StyledCategory>
      <Button type="button" checked={isAll} onClick={onClickAll}>
        전체
      </Button>
      <Button type="button" checked={is1} onClick={onClick1}>
        1기
      </Button>
      <Button type="button" checked={is2} onClick={onClick2}>
        2기
      </Button>
      <Button type="button" checked={is3} onClick={onClick3}>
        3기
      </Button>
    </StyledCategory>
  );
};

export default Category;
