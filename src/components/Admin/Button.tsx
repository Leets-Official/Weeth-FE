import styled from 'styled-components';
import theme from '@/styles/theme';

interface ButtonProps {
  color: string;
  description: string;
}

const Wrapper = styled.div<{ color: string }>`
  width: 64px;
  height: 48px;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = styled.div`
  font-size: 18px;
  font-family: ${theme.font.regular};
  color: white;
`;

const Button: React.FC<ButtonProps> = ({ color, description }) => {
  return (
    <Wrapper color={color}>
      <Description>{description}</Description>
    </Wrapper>
  );
};
export default Button;
