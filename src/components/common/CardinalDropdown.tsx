import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import open from '@/assets/images/ic_opened_dropdown.svg';
import close from '@/assets/images/ic_default_dropdown.svg';
import useGetAllCardinals from '@/api/useGetCardinals';

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  width: 76px;
  min-width: 76px;
  height: 31px;
  box-sizing: border-box;
  font-family: ${theme.font.semiBold};
`;

const DropdownButton = styled.div<{ $hasValue: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  outline: none;
  background-color: ${theme.color.gray[30]};
  color: #fff;
  font-size: 14px;
  border-radius: 10px;
  padding: 0 10px 0 15px;
  cursor: pointer;
`;

const DropdownList = styled.div`
  position: absolute;
  width: 76px;
  max-height: 190px;
  top: 100%;
  margin-top: 5px;
  z-index: 1000;
  overflow-y: auto;
  border-radius: 10px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  background-color: ${theme.color.gray[30]};

  &:hover {
    background-color: ${theme.color.gray[9]};
  }
`;

const CardinalDropdown = ({
  origValue,
  editValue,
  isMember,
}: {
  origValue: number | null;
  editValue: (value: number | null) => void;
  isMember?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(origValue);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { allCardinals } = useGetAllCardinals();

  const options: { value: number | null; label: string }[] =
    allCardinals
      ?.map(({ cardinalNumber }) => ({
        value: cardinalNumber,
        label: `${cardinalNumber}기`,
      }))
      .reverse() || [];

  if (isMember === true) options.unshift({ value: null, label: '전체' });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: number | null) => {
    setSelectedValue(value);
    editValue(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(origValue);
  }, [origValue]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={handleToggle} $hasValue={!!selectedValue}>
        {selectedValue ? `${selectedValue}기` : '기수'}
        {isOpen ? (
          <img src={open} alt="open" />
        ) : (
          <img src={close} alt="close" />
        )}
      </DropdownButton>

      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default CardinalDropdown;
