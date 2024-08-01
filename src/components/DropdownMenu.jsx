import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../styles/theme';

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 25px 8px 25px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const DropdownButton = styled.div`
  width: 234px;
  height: 45px;
  padding-right: 10px;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DropdownList = styled.div`
  position: absolute;
  width: 244px;
  top: calc(100% - 8px);
  right: 25px;
  border-radius: 4px;
  margin-top: 5px;
  z-index: 1000;
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

const DropdownMenu = ({ text, origValue, editValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(origValue);
  const dropdownRef = useRef(null);

  const options = [
    { value: '경영학과', label: '경영학과' },
    { value: '시각디자인학과', label: '시각디자인학과' },
    { value: '산업공학과', label: '산업공학과' },
    { value: 'SW', label: '소프트웨어전공' },
    { value: 'AI', label: '인공지능전공' },
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
      <div>{text}</div>
      <DropdownButton onClick={handleToggle}>{selectedValue}</DropdownButton>
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

DropdownMenu.propTypes = {
  text: PropTypes.string.isRequired,
  origValue: PropTypes.string.isRequired,
  editValue: PropTypes.func.isRequired,
};

export default DropdownMenu;
