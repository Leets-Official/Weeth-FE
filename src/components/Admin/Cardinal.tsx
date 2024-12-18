import { useState } from 'react';
import styled from 'styled-components';
import CardinalSVG from '@/assets/images/ic_admin_cardinal.svg';

interface CardinalProps {
  selectedCardinal?: string;
  setSelectedCardinal?: (cardinal: string) => void;
}

const CardinalWrapper = styled.div`
  width: 166px;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

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
const DropdownMenu = styled.div``;
const DropdownItem = styled.div``;

const CardinalDropdown: React.FC<CardinalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCardinal, setSelectedCardinal] = useState('기수');

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectCardinal = (value: string) => {
    setSelectedCardinal(value);
    setIsOpen(false);
  };
  return (
    <CardinalWrapper>
      <CardinalButton onClick={toggleDropdown}>
        <div>{selectedCardinal}</div>
        <img src={CardinalSVG} alt="cardinal" />
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
    </CardinalWrapper>
  );
};

export default CardinalDropdown;
