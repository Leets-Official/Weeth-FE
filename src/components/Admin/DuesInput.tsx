import styled from 'styled-components';
import theme from '@/styles/theme';
import { forwardRef } from 'react';

interface InputProps {
  width: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

const Input = styled.input<InputProps>`
  width: ${(props) => props.width};
  gap: 5%;
  height: 48px;
  border-radius: 5px;
  border: 1px solid #dedede;
  padding-left: 10px;
  font-family: ${theme.font.regular};
  font-size: 18px;
  cursor: ${(props) => (props.readOnly ? 'not-allowed' : 'text')};

  &::placeholder {
    font-family: ${theme.font.regular};
    font-size: 18px;
    color: #a6a6a6;
    margin-left: 5px;
  }

  &:focus {
    outline: none;
    border-color: black;
  }
`;

const DuesInput = forwardRef<HTMLInputElement, InputProps>(
  ({ width, placeholder, value, onChange, onBlur, readOnly }, ref) => {
    return (
      <Input
        ref={ref}
        width={width}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
      />
    );
  },
);

DuesInput.displayName = 'DuesInput';
export default DuesInput;
