import { useState, useEffect } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import theme from '../../styles/theme';

const StyledInfoInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 8px;
  padding-left: ${(props) => props.padding || '0px'};
  padding-right: ${(props) => props.padding || '0px'};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const Input = styled.input`
  width: ${(props) => props.width || '100%'};
  height: 45px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
`;

const InfoInput = ({
  text,
  origValue,
  editValue,
  placeholder,
  width,
  padding,
}) => {
  const [value, setValue] = useState(origValue);

  const onChangeValue = (e) => {
    setValue(e.target.value);
    editValue(e.target.value);
  };

  useEffect(() => {
    setValue(origValue);
  }, [origValue]);

  return (
    <StyledInfoInput padding={padding}>
      <div>{text}</div>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChangeValue}
        width={width}
      />
    </StyledInfoInput>
  );
};

InfoInput.propTypes = {
  text: PropTypes.string.isRequired,
  origValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  editValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
};

export default InfoInput;
