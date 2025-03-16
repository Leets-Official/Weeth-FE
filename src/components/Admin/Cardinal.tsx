import { useState } from 'react';
import styled from 'styled-components';
import CardinalSVG from '@/assets/images/ic_admin_cardinal.svg';
import { CardinalProps } from '@/types/adminCardinal';
import { useGetAllCardinals } from '@/api/useGetCardinals';

export const CardinalButton = styled.div`
  width: 118px;
  height: 48px;
  border: 1px solid #dedede;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  color: black;
`;

export const DropdownMenu = styled.div.attrs<{ itemCount: number }>(
  (props) => ({
    style: {
      maxHeight: props.itemCount > 4 ? '240px' : 'auto',
      overflowY: props.itemCount > 4 ? 'auto' : 'hidden',
    },
  }),
)`
  width: 118px;
  background-color: #ffffff;
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: black;
  position: absolute;
  z-index: 5;
`;

export const DropdownItem = styled.div`
  width: 100%;
  height: 48px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ArrowIcon = styled.img`
  &.open {
    transform: rotate(180deg);
  }
`;

const CardinalDropdown: React.FC<CardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { allCardinals } = useGetAllCardinals();

  const sortedCardinals = [...allCardinals].reverse();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCardinal = (value: number) => {
    setSelectedCardinal(value);
    setIsOpen(false);
  };

  return (
    <>
      <CardinalButton onClick={toggleDropdown}>
        <div>
          {selectedCardinal === 0 || selectedCardinal === null
            ? '기수'
            : `${selectedCardinal}기`}
        </div>
        <ArrowIcon
          src={CardinalSVG}
          alt="cardinal"
          className={isOpen ? 'open' : ''}
        />
      </CardinalButton>
      {isOpen && (
        <DropdownMenu itemCount={sortedCardinals.length}>
          {sortedCardinals.length === 0 && (
            <DropdownItem>기수 없음</DropdownItem>
          )}
          {sortedCardinals.map((item) => (
            <DropdownItem
              key={item.id}
              onClick={() => selectCardinal(item.cardinalNumber)}
            >
              {item.cardinalNumber}기
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </>
  );
};

export default CardinalDropdown;
