import { useDraggable } from '@/service/useDraggable';
import * as S from '@/styles/memeber/Category.styled';
import { useRef, useState } from 'react';

interface CategoryProps {
  setSelectedCardinal: (index: number) => void;
  index?: number;
}

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
    <S.StyledCategory>
      <S.ScrollContainer
        ref={scrollerRef1}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <S.Button
          type="button"
          $isSelected={selectedCategory === 0}
          onClick={() => onClickCardinal(0)}
        >
          전체
        </S.Button>
        <S.Button
          type="button"
          $isSelected={selectedCategory === 4}
          onClick={() => onClickCardinal(4)}
        >
          4기
        </S.Button>
        <S.Button
          type="button"
          $isSelected={selectedCategory === 3}
          onClick={() => onClickCardinal(3)}
        >
          3기
        </S.Button>
        <S.Button
          type="button"
          $isSelected={selectedCategory === 2}
          onClick={() => onClickCardinal(2)}
        >
          2기
        </S.Button>
        <S.Button
          type="button"
          $isSelected={selectedCategory === 1}
          onClick={() => onClickCardinal(1)}
        >
          1기
        </S.Button>
      </S.ScrollContainer>
    </S.StyledCategory>
  );
};

export default Category;
