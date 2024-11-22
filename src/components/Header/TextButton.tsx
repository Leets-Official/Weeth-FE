import theme from '@/styles/theme';
import styled from 'styled-components';

const StyledText = styled.div<{ isComplete: boolean }>`
  color: ${(props) =>
    props.isComplete
      ? theme.color.main.mainColor
      : theme.color.grayScale.white};
  cursor: pointer;
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const TextButton = ({
  text,
  isComplete,
  onClick,
}: {
  text: string;
  isComplete: boolean;
  onClick: () => void;
}) => {
  return (
    <StyledText isComplete={isComplete} onClick={onClick}>
      {text}
    </StyledText>
  );
};

export default TextButton;
