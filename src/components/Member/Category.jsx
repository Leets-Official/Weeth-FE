import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

const StyledCategory = styled.div`
  padding-top: 20px;
  font-family: ${theme.font.family.pretendard_regulars};
  font-size: 16px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  height: 39px;
  width: 22%;
  border: 2px solid;
  border-width: 0 0 2px;
  border-color: ${(props) => (props.checked ? 'white' : 'transparent')};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const Category = ({ setSelectedCardinal }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const onClickAll = () => {
    setSelectedCategory(0);
    setSelectedCardinal(0);
  };

  const onClick1 = () => {
    setSelectedCategory(1);
    setSelectedCardinal(1);
  };

  const onClick2 = () => {
    setSelectedCategory(2);
    setSelectedCardinal(2);
  };

  const onClick3 = () => {
    setSelectedCategory(3);
    setSelectedCardinal(3);
  };

  return (
    <StyledCategory>
      <Button
        type="button"
        checked={selectedCategory === 0}
        onClick={onClickAll}
      >
        전체
      </Button>
      <Button type="button" checked={selectedCategory === 1} onClick={onClick1}>
        1기
      </Button>
      <Button type="button" checked={selectedCategory === 2} onClick={onClick2}>
        2기
      </Button>
      <Button type="button" checked={selectedCategory === 3} onClick={onClick3}>
        3기
      </Button>
    </StyledCategory>
  );
};

Category.propTypes = {
  setSelectedCardinal: PropTypes.number.isRequired,
};

export default Category;
