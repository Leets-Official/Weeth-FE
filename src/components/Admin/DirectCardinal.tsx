import { useState } from 'react';
import { styled } from 'styled-components';
import { DirectCardinalProps } from '@/types/adminCardinal';
import useGetAllCardinals from '@/api/useGetCardinals';
import CardinalSVG from '@/assets/images/ic_admin_column_meatball.svg';
import {
  CardinalButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/Admin/Cardinal';

export const StyledCardinal = styled.div`
  width: 35%;
  position: relative;
  z-index: 1000;
`;

const DirectCardinalDropdown: React.FC<DirectCardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { allCardinals } = useGetAllCardinals();
  const [isCustomInput] = useState(false);

  const sortedCardinals = [...allCardinals].reverse();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCardinal = (value: number) => {
    setSelectedCardinal(value, false);
    setIsOpen(false);
  };

  const handleCustomInput = () => {
    setSelectedCardinal(0, true);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (isCustomInput || selectedCardinal === 0 || selectedCardinal === null)
      return '직접 입력';
    return `${selectedCardinal}기`;
  };

  return (
    <StyledCardinal>
      <CardinalButton onClick={toggleDropdown}>
        <div>{getDisplayText()}</div>

        <img
          src={CardinalSVG}
          alt="cardinal"
          className={isOpen ? 'open' : ''}
        />
      </CardinalButton>
      {isOpen && (
        <DropdownMenu>
          {sortedCardinals.length === 0 && (
            <DropdownItem>기수 없음</DropdownItem>
          )}
          {sortedCardinals.length > 0 &&
            sortedCardinals.map((item) => (
              <DropdownItem
                key={item.id}
                onClick={() => selectCardinal(item.cardinalNumber)}
              >
                {item.cardinalNumber}기
              </DropdownItem>
            ))}
          <DropdownItem onClick={handleCustomInput}>직접 입력</DropdownItem>
        </DropdownMenu>
      )}
    </StyledCardinal>
  );
};

export default DirectCardinalDropdown;
