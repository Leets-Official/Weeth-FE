import SignupWhite from '@/components/Signup/SignupWhite';
import theme from '@/styles/theme';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface DropdownMenuProps {
  text: string;
  origValue: string;
  editValue: (value: string) => void;
  buttonstyle: string;
}

const DropdownContainer = styled.div<{ buttonstyle: 'member' | 'signup' }>`
  position: relative;
  display: flex;
  align-items: center;
  font-family: ${theme.font.regular};
  font-size: 16px;
  ${(props) =>
    props.buttonstyle === 'member' &&
    `
  justify-content: space-between;
  padding: 16px 25px 8px 25px;
    `}
`;

const DropdownButton = styled.div`
  width: 234px;
  height: 45px;
  padding-right: 10px;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.gray[18]};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SignupDropDownButton = styled.div<{ $hasValue: boolean }>`
  width: 58%;
  height: 25px;
  font-size: 16px;
  outline: none;
  border-bottom: 1px solid ${theme.color.gray[20]};
  background-color: ${theme.color.gray[12]};
  color: ${(props) => (props.$hasValue ? 'white' : theme.color.gray[20])};
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Label = styled.div`
  width: 7%;
  height: 19px;
  margin-left: 10%;
  margin-right: 9%;
  font-size: 16px;
  line-height: 19.09px;
`;

const DropdownList = styled.div<{ buttonstyle: 'member' | 'signup' }>`
  position: absolute;
  width: 244px;
  top: calc(100% - 8px);
  right: 25px;
  border-radius: 4px;
  margin-top: 5px;
  z-index: 1000;
  background-color: ${(props) =>
    props.buttonstyle === 'signup' ? '#2c2c2c' : 'transparent'};
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  background-color: #2c2c2c;

  &:hover {
    background-color: ${theme.color.mainMiddle};
  }
`;

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  text,
  origValue,
  editValue,
  buttonstyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(origValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: '경영학과', label: '경영학과' },
    { value: '경제학과', label: '경제학과' },
    { value: '시각디자인학과', label: '시각디자인학과' },
    { value: '산업공학과', label: '산업공학과' },
    { value: '소프트웨어전공', label: '소프트웨어전공' },
    { value: '인공지능전공', label: '인공지능전공' },
    { value: '컴퓨터공학과', label: '컴퓨터공학과' },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (label: string, value: string) => {
    setSelectedValue(label);
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
    <DropdownContainer
      ref={dropdownRef}
      buttonstyle={buttonstyle as 'member' | 'signup'}
    >
      {buttonstyle === 'member' ? (
        <>
          <div>{text}</div>
          <DropdownButton onClick={handleToggle}>
            {selectedValue}
          </DropdownButton>
        </>
      ) : (
        <>
          <Label>
            <SignupWhite text={text} />
          </Label>
          <SignupDropDownButton
            onClick={handleToggle}
            $hasValue={!!selectedValue}
          >
            {selectedValue || '학과를 선택해주세요'}
          </SignupDropDownButton>
        </>
      )}
      {isOpen && (
        <DropdownList buttonstyle={buttonstyle as 'member' | 'signup'}>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.label, option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default DropdownMenu;
