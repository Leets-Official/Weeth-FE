import styled from 'styled-components';
import theme from '@/styles/theme';

interface ButtonProps {
  color: string;
  description: string;
  width: string;
}

const Wrapper = styled.div<{ color: string; width: string }>`
  width: ${(props) => props.width || '64px'};
  height: 48px;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Description = styled.div`
  font-size: 18px;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[100]};
`;

const Button: React.FC<ButtonProps> = ({ color, description, width }) => {
  return (
    <Wrapper color={color} width={width}>
      <Description>{description}</Description>
    </Wrapper>
  );
};
export default Button;
