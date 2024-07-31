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

const DateInput = ({ value, onChange, width, height, margin }) => {
  const [date, setDate] = useState(value);

  const onChangeValue = (e) => {
    setDate(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <div>
      <StyledInput
        type="number"
        value={date}
        onChange={onChangeValue}
        width={width}
        height={height}
        margin={margin}
      />
    </div>
  );
};

DateInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
};

export default DateInput;
