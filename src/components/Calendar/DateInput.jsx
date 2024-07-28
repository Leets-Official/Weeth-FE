import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../styles/theme';

const StyledInput = styled.input`
  height: ${(props) => props.height || '0px'};
  width: ${(props) => props.width || '0px'};
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray12};
  color: white;
  text-align: center;
  margin-left: ${(props) => props.margin || '0px'};
  margin-right: ${(props) => props.margin || '0px'};
  // padding-right: 10px;
  padding: 0px;
  font-size: 16px;
`;

const DateInput = ({ value, editValue, width, height, margin }) => {
  return (
    <div>
      <StyledInput
        type="number"
        value={value}
        onChange={editValue}
        width={width}
        height={height}
        margin={margin}
      />
    </div>
  );
};

DateInput.propTypes = {
  value: PropTypes.number.isRequired,
  editValue: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
};

export default DateInput;
