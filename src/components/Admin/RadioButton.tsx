import React from 'react';
import styled from 'styled-components';

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  color: string;
}

const RadioWrapper = styled.label<{ checked: boolean; color: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ checked, color }) => (checked ? color : '#000')};
`;

const StyledInput = styled.input<{ color: string }>`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ checked, color }) => (checked ? color : '#a6a6a6')};
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  &:checked::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid #a6a6a6;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: ${({ color }) => color};
    border-color: ${({ color }) => color};
    transform: translate(-50%, -50%);
  }
`;

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  color,
}) => {
  return (
    <RadioWrapper checked={checked} color={color}>
      <StyledInput
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        color={color}
      />
    </RadioWrapper>
  );
};

export default RadioButton;
