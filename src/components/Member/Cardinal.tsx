import { useDraggable } from '@/service/useDraggable';
import * as S from '@/styles/memeber/Cardinal.styled';
import { useRef } from 'react';

interface CardinalProps {
  selectedCardinal: number;
  setSelectedCardinal: (index: number) => void;
  index?: number;
}

const Cardinal: React.FC<CardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
}) => {
  const scrollerRef1 = useRef(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef1);

  const cardinals: number[] = [0, 4, 3, 2, 1];

  return (
    <S.Cardinal>
      <S.ScrollContainer
        ref={scrollerRef1}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {cardinals.map((cardinal: number) => (
          <S.Button
            type="button"
            $isSelected={selectedCardinal === cardinal}
            onClick={() => setSelectedCardinal(cardinal)}
          >
            {cardinal === 0 ? '전체' : `${cardinal}기`}
          </S.Button>
        ))}
      </S.ScrollContainer>
    </S.Cardinal>
  );
};

export default Cardinal;
