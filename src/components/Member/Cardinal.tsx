import { useDraggable } from '@/hooks/useDraggable';
import * as S from '@/styles/member/Cardinal.styled';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const nav = useNavigate();

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
            onClick={() => {
              setSelectedCardinal(cardinal);
              nav(`?cardinal=${cardinal}`);
            }}
          >
            {cardinal === 0 ? '전체' : `${cardinal}기`}
          </S.Button>
        ))}
      </S.ScrollContainer>
    </S.Cardinal>
  );
};

export default Cardinal;
