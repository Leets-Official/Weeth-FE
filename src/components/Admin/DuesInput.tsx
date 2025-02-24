import styled from 'styled-components';
import theme from '@/styles/theme';

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

const DuesInput: React.FC<InputProps> = ({
  width,
  placeholder,
  value,
  onChange,
  onBlur,
  readOnly,
}) => {
  return (
    <Input
      width={width}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      readOnly={readOnly}
    />
  );
};

export default DuesInput;
