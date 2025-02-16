import { useState } from 'react';
import { styled } from 'styled-components';
import { CardinalProps } from '@/types/adminCardinal';
import useGetAllCardinals from '@/api/useGetCardinals';
import CardinalSVG from '@/assets/images/ic_admin_column_meatball.svg';
import {
  ArrowIcon,
  CardinalButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/Admin/Cardinal';

export const StyledCardinal = styled.div`
  width: 35%;
  position: relative;
  z-index: 1000;
`;

const DirectCardinalDropdown: React.FC<CardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { allCardinals } = useGetAllCardinals();
  const [isCustomInput, setIsCustomInput] = useState(false);

  const sortedCardinals = [...allCardinals].reverse();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCardinal = (value: number) => {
    setSelectedCardinal(value);
    setIsCustomInput(false);

    setIsOpen(false);
  };

  const handleCustomInput = () => {
    setIsCustomInput(true);
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

        <ArrowIcon
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
