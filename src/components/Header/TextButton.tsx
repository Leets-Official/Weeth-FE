import styled from 'styled-components';
import theme from '../../styles/theme';

interface TextButtonProps {
  text: string;
  color: 'mainColor' | 'default';
  onClick?: () => void;
}

const StyledText = styled.div<{ color: 'mainColor' | 'default' }>`
  color: ${(props) => (props.color === 'mainColor' ? '#00dda8' : '#ffffff')};
  cursor: pointer;
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const TextButton: React.FC<TextButtonProps> = ({ text, color, onClick }) => {
  return (
    <StyledText color={color} onClick={onClick}>
      {text}
    </StyledText>
  );
};

export default TextButton;