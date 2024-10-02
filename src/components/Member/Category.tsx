import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useDraggable } from '@/service/useDraggable';
import theme from '../../styles/theme';

interface CategoryProps {
  setSelectedCardinal: (index: number) => void;
  index?: number;
}

const StyledCategory = styled.div`
  display: flex;
  padding-top: 20px;
  overflow-x: auto;
  white-space: nowrap;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const ScrollContainer = styled.div`
  display: flex;
  width: 94%;
  overflow-x: auto;
  cursor: grab;
  &::-webkit-scrollbar {
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
  }
`;

const Button = styled.button<{ $isSelected: boolean }>`
  background-color: transparent;
  border: none;
  height: 39px;
  width: 62px;
  flex-shrink: 0;
  border: 2px solid;
  border-width: 0 0 2px;
  border-color: ${(props) => (props.$isSelected ? 'white' : 'transparent')};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const Category: React.FC<CategoryProps> = ({ setSelectedCardinal }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const onClickCardinal = (index: number) => {
    setSelectedCategory(index);
    setSelectedCardinal(index);
  };

  const scrollerRef1 = useRef(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef1);

  return (
    <StyledCategory>
      <ScrollContainer
        ref={scrollerRef1}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <Button
          type="button"
          $isSelected={selectedCategory === 0}
          onClick={() => onClickCardinal(0)}
        >
          전체
        </Button>
        <Button
          type="button"
          $isSelected={selectedCategory === 4}
          onClick={() => onClickCardinal(4)}
        >
          4기
        </Button>
        <Button
          type="button"
          $isSelected={selectedCategory === 3}
          onClick={() => onClickCardinal(3)}
        >
          3기
        </Button>
        <Button
          type="button"
          $isSelected={selectedCategory === 2}
          onClick={() => onClickCardinal(2)}
        >
          2기
        </Button>
        <Button
          type="button"
          $isSelected={selectedCategory === 1}
          onClick={() => onClickCardinal(1)}
        >
          1기
        </Button>
      </ScrollContainer>
    </StyledCategory>
  );
};

export default Category;
