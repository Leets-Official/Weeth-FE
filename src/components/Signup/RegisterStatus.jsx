import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../styles/theme';

const RegisterStatus = styled.div`
  color: ${(props) => (props.color === 'green' ? '#00dda8' : '#ffffff')};
  cursor: pointer;
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const TextButton = ({ text, color, onClick }) => {
  return (
    <RegisterStatus color={color} onClick={onClick}>
      {text}
    </RegisterStatus>
  );
};

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TextButton;
