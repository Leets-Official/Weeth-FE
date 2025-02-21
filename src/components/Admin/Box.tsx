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
  onClick?: () => void;
  isClick?: boolean;
  isSelected?: boolean;
}

export const Wrapper = styled.div<{
  color: string;
  isCardinalBox: boolean;
  isClick?: boolean;
  isSelected?: boolean;
}>`
  width: ${({ isCardinalBox }) => (isCardinalBox ? 'none' : '234px')};
  min-width: ${({ isCardinalBox }) => (isCardinalBox ? '234px' : 'none')};
  height: 164px;
  background-color: ${({ isSelected, color }) =>
    isSelected ? theme.color.gray[18] : color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
  cursor: ${({ isClick }) => (isClick ? 'pointer' : 'auto')};

  ${({ isClick, isSelected }) =>
    isClick &&
    !isSelected &&
    `
    &:hover {
      background-color: ${theme.color.gray[18]};
    }
  `}
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
  color: ${({ lastColor }) => lastColor || '#979797'};
`;

const Box: React.FC<BoxProps> = ({
  title,
  description,
  last,
  color,
  lastColor,
  isCardinalBox = false,
  onClick,
  isClick = false,
  isSelected = false,
}) => {
  return (
    <Wrapper
      onClick={onClick}
      color={color}
      isCardinalBox={isCardinalBox}
      isClick={isClick}
      isSelected={isSelected}
    >
      {title && <Title>{title}</Title>}
      <Description>{description}</Description>
      <Last lastColor={lastColor}>{last}</Last>
    </Wrapper>
  );
};
export default Box;
