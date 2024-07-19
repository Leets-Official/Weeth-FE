import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledText = styled.div`
  color: ${(props) => (props.color === 'green' ? '#00dda8' : '#ffffff')};
  cursor: pointer;
  font-weight: 600; //semi-bold
`;

const TextButton = ({ text, color, onClick }) => {
  return (
    <StyledText color={color} onClick={onClick}>
      {text}
    </StyledText>
  );
};

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextButton;