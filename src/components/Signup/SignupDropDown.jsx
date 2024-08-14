import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../styles/theme';
import SignupWhite from './SignupWhite';

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const DropdownButton = styled.div`
  width: 58%;
  height: 25px;
  font-size: 16px;
  outline: none;
  border-bottom: 1px solid ${theme.color.grayScale.gray20};
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray12};
  color: ${(props) =>
    props.hasValue ? 'white' : theme.color.grayScale.gray20};
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
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

const DropdownList = styled.div`
  position: absolute;
  width: 244px;
  top: calc(100% - 8px);
  right: 25px;
  border-radius: 4px;
  margin-top: 5px;
  z-index: 1000;
  background-color: #2c2c2c; /* 드롭다운 배경색 추가 */
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  background-color: #2c2c2c;

  &:hover {
    background-color: ${theme.color.main.selectedMain};
  }
`;

const SignupDropDown = ({ text, origValue, editValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(origValue);
  const dropdownRef = useRef(null);

  const options = [
    { value: '경영학과', label: '경영학과' },
    { value: '시각디자인학과', label: '시각디자인학과' },
    { value: '산업공학과', label: '산업공학과' },
    { value: '소프트웨어전공', label: '소프트웨어전공' },
    { value: '인공지능전공', label: '인공지능전공' },
    { value: '컴퓨터공학과', label: '컴퓨터공학과' },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (label, value) => {
    setSelectedValue(label);
    editValue(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
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
      <Label>
        <SignupWhite text={text} />
      </Label>
      <DropdownButton onClick={handleToggle} hasValue={!!selectedValue}>
        {selectedValue || '학과를 선택해주세요'}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
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

SignupDropDown.propTypes = {
  text: PropTypes.string.isRequired,
  origValue: PropTypes.string.isRequired,
  editValue: PropTypes.func.isRequired,
};

export default SignupDropDown;
