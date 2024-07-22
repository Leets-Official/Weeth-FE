import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

const StyledCategory = styled.div`
  padding-top: 30px;
  font-family: ${theme.font.family.pretendard_regular};
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  height: 39px;
  width: 30%;
  border: 2px solid;
  border-width: 0 0 2px;
  border-color: ${(props) => (props.checked ? 'white' : 'transparent')};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_semiBold};
  text-align: center;
`;

const DueCategory = ({ setSelectedCardinal }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const onClickAll = () => {
    setSelectedCategory('all');
    setSelectedCardinal(null);
  };

  const onClick1 = () => {
    setSelectedCategory('1');
    setSelectedCardinal(1);
  };

  const onClick2 = () => {
    setSelectedCategory('2');
    setSelectedCardinal(2);
  };

  return (
    <StyledCategory>
      <Button
        type="button"
        checked={selectedCategory === 'all'}
        onClick={onClickAll}
      >
        전체
      </Button>
      <Button
        type="button"
        checked={selectedCategory === '1'}
        onClick={onClick1}
      >
        수입
      </Button>
      <Button
        type="button"
        checked={selectedCategory === '2'}
        onClick={onClick2}
      >
        지출
      </Button>
    </StyledCategory>
  );
};

DueCategory.propTypes = {
  setSelectedCardinal: PropTypes.func.isRequired,
};

export default DueCategory;
