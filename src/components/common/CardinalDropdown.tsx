import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import open from '@/assets/images/ic_opened_dropdown.svg';
import close from '@/assets/images/ic_default_dropdown.svg';

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  width: 76px;
  height: 31px;
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
  top: 100%;
  margin-top: 5px;
  z-index: 1000;
  background-color: ${theme.color.gray[30]};
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
}: {
  origValue: number; // 단일 숫자로 변경
  editValue: (value: number) => void; // 단일 숫자로 변경
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number>(origValue); // 단일 숫자로 변경
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: 1, label: '1기' },
    { value: 2, label: '2기' },
    { value: 3, label: '3기' },
    { value: 4, label: '4기' },
    { value: 5, label: '5기' },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: number) => {
    setSelectedValue(value); // 단일 숫자로 설정
    editValue(value); // 부모 컴포넌트에 업데이트된 값 전달
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
    setSelectedValue(origValue); // 부모 컴포넌트에서 전달된 값으로 초기화
  }, [origValue]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={handleToggle} $hasValue={!!selectedValue}>
        {selectedValue ? `${selectedValue}기` : '기수'} {/* 선택된 값 표시 */}
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
