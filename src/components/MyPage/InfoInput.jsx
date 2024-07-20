import { useState } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInfoInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 25px 8px 25px;
`;

const Input = styled.input`
  width: 75%; //피그마대로 하면 핸드폰 글자가 잘림ㅜㅜ 디자이너 컨펌 필요
  height: 45px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: #2f2f2f;
  color: white;
  text-align: right;
  padding-right: 10px;
  font-size: 16px;
`;

const InfoInput = ({ text, origValue }) => {
  const [value, setValue] = useState(origValue);

  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <StyledInfoInput>
      <div>{text}</div>
      <Input value={value} onChange={onChangeValue} />
    </StyledInfoInput>
  );
};

InfoInput.propTypes = {
  text: PropTypes.string.isRequired,
  origValue: PropTypes.string.isRequired,
};

export default InfoInput;
