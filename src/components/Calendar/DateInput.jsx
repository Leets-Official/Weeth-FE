/* eslint-disable react/require-default-props */
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

const getMaxDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const DateInput = ({
  value,
  onChange,
  width,
  height,
  margin,
  year,
  month,
  inputType,
}) => {
  const [date, setDate] = useState(value);

  const validateValue = (val) => {
    switch (inputType) {
      case 'year':
        return val.length <= 4 && val >= 2020 && val <= 2040; // 최대 4자리
      case 'month':
        return val >= 1 && val <= 12; // 1~12 사이
      case 'day':
        if (year && month) {
          const maxDays = getMaxDaysInMonth(year, month);
          return val >= 1 && val <= maxDays;
        }
        return val >= 1 && val <= 31; // 기본 1~31 사이
      case 'hour':
        return val >= 0 && val <= 23; // 0~23 사이
      case 'minute':
        return val >= 0 && val <= 59; // 0~59 사이
      default:
        return true;
    }
  };

  const onChangeValue = (e) => {
    const val = e.target.value;
    if (validateValue(val)) {
      setDate(val);
      onChange(val);
    }
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
        min={inputType === 'year' ? '1000' : undefined}
        max={inputType === 'year' ? '9999' : undefined}
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
  year: PropTypes.number,
  month: PropTypes.number,
  inputType: PropTypes.oneOf(['year', 'month', 'day', 'hour', 'minute'])
    .isRequired,
};

export default DateInput;
