import SignupWhite from '@/components/Signup/SignupWhite';
import theme from '@/styles/theme';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div<{ type: 'mypage' | 'signup' }>`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;
  ${(props) =>
    props.type === 'mypage' &&
    `
    justify-content: center;
    gap: 26px;
    `}
`;

const Title = styled.div<{ isProfile?: boolean }>`
  width: 42px;
  color: ${(props) =>
    props.isProfile ? theme.color.gray[100] : theme.color.gray[65]};
`;

const DropdownButton = styled.div`
  width: 257px;
  height: 45px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-bottom: 1px;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.gray[18]};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SignupDropDownButton = styled.div<{ $hasValue: boolean }>`
  width: 58%;
  height: 25px;
  font-size: 16px;
  outline: none;
  padding: 1px 2px;
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
`;

const DropdownList = styled.div<{ type: 'mypage' | 'signup' }>`
  position: absolute;
  width: ${(props) => (props.type === 'mypage' ? '255px' : '243px')};
  top: calc(100%);
  border: 1px solid #2c2c2c;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  right: ${(props) => (props.type === 'mypage' ? '22.5px' : '30px')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 5px;
  z-index: 1000;
  background-color: ${(props) =>
    props.type === 'signup' ? '#2c2c2c' : 'transparent'};
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

const DropdownMenu = ({
  text,
  origValue,
  editValue,
  type,
  isProfile,
  isCardinal,
}: {
  text: string;
  origValue: string;
  editValue: (value: string) => void;
  type: string;
  isProfile?: boolean;
  isCardinal?: boolean;
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
    { value: '한국어문학과', label: '한국어문학과' },
    { value: '도시계획학전공', label: '도시계획학전공' },
    { value: '글로벌경영학과', label: '글로벌경영학과' },
    { value: '금융수학전공', label: '금융수학전공' },
    { value: '의료산업경영학과', label: '의료산업경영학과' },
  ].sort((a, b) =>
    a.label.localeCompare(b.label, 'ko', { sensitivity: 'base' }),
  );

  const cardinalOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ].sort((a, b) =>
    b.label.localeCompare(a.label, 'ko', { sensitivity: 'base' }),
  );

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
    <DropdownContainer ref={dropdownRef} type={type as 'mypage' | 'signup'}>
      {type === 'mypage' ? (
        <>
          <Title isProfile={isProfile}>{text}</Title>
          <DropdownButton onClick={handleToggle}>
            {selectedValue ||
              (isCardinal ? '기수를 선택해주세요' : '학과를 선택해주세요')}
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
        <DropdownList type={type as 'mypage' | 'signup'}>
          {(isCardinal ? cardinalOptions : options).map((option) => (
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
