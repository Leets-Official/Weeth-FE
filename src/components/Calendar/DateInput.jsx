import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

const StyledInput = styled.input`
  height: ${(props) => props.height || '0px'};
  width: ${(props) => props.width || '0px'};
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray12};
  color: white;
  text-align: center;
  margin-left: ${(props) => props.margin || '0px'};
  margin-right: ${(props) => props.margin || '0px'};
  // padding-right: 10px;
  padding: 0px;
  font-size: 16px;

  /* Custom CSS to remove arrows in number input */
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;
`;

const DateInput = ({ origValue, editValue, width, height, margin }) => {
  const [value, setValue] = useState(origValue);

  const onChangeValue = (e) => {
    setValue(e.target.value);
    editValue(e.target.value);
  };

  useEffect(() => {
    setValue(origValue);
  }, [origValue]);

  return (
    <div>
      <StyledInput
        type="number"
        value={value}
        onChange={onChangeValue}
        width={width}
        height={height}
        margin={margin}
      />
    </div>
  );
};

DateInput.propTypes = {
  origValue: PropTypes.number.isRequired,
  editValue: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
};

export default DateInput;
