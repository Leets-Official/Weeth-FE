import { useState } from 'react';
import styled from 'styled-components';
import CardinalSVG from '@/assets/images/ic_admin_cardinal.svg';
import { CardinalProps } from '@/types/adminCardinal';

const CardinalButton = styled.div`
  width: 118px;
  height: 48px;
  border: 1px solid #dedede;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
`;

export const DropdownMenu = styled.div`
  width: 118px;
  height: 48px;
  background-color: #ffffff;
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 3;
  position: absolute;
`;

export const DropdownItem = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ArrowIcon = styled.img`
  &.open {
    transform: rotate(180deg);
  }
`;

const CardinalDropdown: React.FC<CardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCardinal = (value: string) => {
    const numberValue = parseInt(value.replace('기', ''), 10);
    setSelectedCardinal(Number.isNaN(numberValue) ? null : numberValue);
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
        <DropdownMenu>
          {['4기', '3기', '2기', '1기'].map((item) => (
            <DropdownItem key={item} onClick={() => selectCardinal(item)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </>
  );
};

export default CardinalDropdown;
