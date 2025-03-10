import styled from 'styled-components';
import theme from '@/styles/theme';

interface ButtonProps {
  color: string;
  description: string;
  width: string;
  onClick?: () => void;
  borderRadius?: string;
}

const Wrapper = styled.div<{
  color: string;
  width: string;
  borderRadius?: string;
}>`
  width: ${(props) => props.width || '64px'};
  height: 48px;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${({ borderRadius }) => borderRadius || '0px'};
`;

const Description = styled.div`
  font-size: 18px;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[100]};
`;

const Button: React.FC<ButtonProps> = ({
  color,
  description,
  width,
  onClick,
  borderRadius,
}) => {
  return (
    <Wrapper
      color={color}
      width={width}
      onClick={onClick}
      borderRadius={borderRadius}
    >
      <Description>{description}</Description>
    </Wrapper>
  );
};
export default Button;
