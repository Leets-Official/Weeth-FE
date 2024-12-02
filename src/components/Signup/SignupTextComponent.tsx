import SignupWhite from '@/components/Signup/SignupWhite';
import theme from '@/styles/theme';
import styled from 'styled-components';

interface SignupTextComponentProps {
  text: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  children?: React.ReactNode;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SignupContainer = styled.div`
  width: 370px;
  max-width: 370px;
  align-items: flex-start;
  margin-top: 0;
`;

const SignupWhiteMargin = styled.div`
  margin-left: 7%;
`;

const Margin = styled.div`
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 87%;
  margin: 0 7%;
  position: relative;
`;

const StyledTextInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-family: ${theme.font.regular};
  line-height: 19px;
  color: ${theme.color.gray[100]};
  background-color: ${theme.color.gray[18]};
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.color.gray[65]};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const SignupTextComponent: React.FC<SignupTextComponentProps> = ({
  text,
  value,
  onChange,
  placeholder,
  type = 'text',
  children,
  onKeyPress,
}) => {
  return (
    <SignupContainer>
      <SignupWhiteMargin>
        <SignupWhite text={text} />
      </SignupWhiteMargin>
      <Margin />
      <InputWrapper>
        <StyledTextInput
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          type={type}
        />
        {children && <IconWrapper>{children}</IconWrapper>}
      </InputWrapper>
    </SignupContainer>
  );
};

export default SignupTextComponent;
