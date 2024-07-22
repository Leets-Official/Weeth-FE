import { useState } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.isYear ? '121px' : '275px')};
  height: 38px;
  background: #2f2f2f;
  border-radius: 14px;
  padding: 20px;
  margin: auto;
`;

const StyledInput = styled.input`
  height: 43px;
  width: 90px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: #1f1f1f;
  color: white;
  text-align: right;
  margin: 0px 10px;
  padding-right: 10px;
  font-size: 16px;
`;

const Text = styled.div`
  margin-right: 15px;
`;

const ModalContent = ({ origYear, origMonth, isYear }) => {
  const [year, setYear] = useState(origYear);
  const [month, setMonth] = useState(origMonth);

  const onChangeYear = (e) => {
    setYear(e.target.value);
  };

  const onChangeMonth = (e) => {
    setMonth(e.target.value);
  };

  if (isYear) {
    return (
      <StyledContent isYear={isYear}>
        <StyledInput type="number" value={year} onChange={onChangeYear} />
        <Text>년</Text>
      </StyledContent>
    );
  }
  return (
    <StyledContent isYear={isYear}>
      <StyledInput type="number" value={year} onChange={onChangeYear} />
      <Text>년</Text>
      <StyledInput type="number" value={month} onChange={onChangeMonth} />
      <Text>월</Text>
    </StyledContent>
  );
};

ModalContent.propTypes = {
  origYear: PropTypes.number.isRequired,
  origMonth: PropTypes.number.isRequired,
  isYear: PropTypes.bool.isRequired,
};

export default ModalContent;
