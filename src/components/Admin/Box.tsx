import styled from 'styled-components';
import theme from '@/styles/theme';

export interface BoxProps {
  title?: string;
  description: string;
  last: string;
  color: string;
  lastColor?: string;
  minWidth?: string;
  isCardinalBox?: boolean;
}

export const Wrapper = styled.div<{
  color: string;
  isCardinalBox: boolean;
}>`
  width: ${({ isCardinalBox }) => (isCardinalBox ? 'none' : '234px')};
  min-width: ${({ isCardinalBox }) => (isCardinalBox ? '234px' : 'none')};
  height: 164px;
  background-color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
`;

export const Title = styled.div<{ isHidden?: boolean }>`
  font-size: 18px;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[100]};
`;

export const Description = styled.div`
  font-size: 24px;
  font-family: ${theme.font.semiBold};
  color: ${theme.color.gray[100]};
  margin-top: 20px;
`;

export const Last = styled.div<{ lastColor?: string }>`
  font-size: 18px;
  font-family: ${theme.font.regular};
  color: ${({ lastColor }) => lastColor || 'rgba(255, 255, 255, 0.5)'};
`;

const Box: React.FC<BoxProps> = ({
  title,
  description,
  last,
  color,
  lastColor,
  isCardinalBox = false,
}) => {
  return (
    <Wrapper color={color} isCardinalBox={isCardinalBox}>
      {title && <Title>{title}</Title>}
      <Description>{description}</Description>
      <Last lastColor={lastColor}>{last}</Last>
    </Wrapper>
  );
};
export default Box;
