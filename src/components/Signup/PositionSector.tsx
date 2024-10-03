import React from 'react';
import styled from 'styled-components';
import SignupWhite from '@/components/Signup/SignupWhite';

// Styled components
const PositionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 370px;
  max-width: 370px;
  margin: 8px 0 33px 0;
`;

const PositionLabel = styled.div`
  width: 10%;
  height: 19px;
  margin-left: 10%;
  margin-right: 5%;
  font-size: 16px;
  line-height: 19.09px;
`;

const Positions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const PositionName = styled.div`
  width: auto;
  margin-left: 5px;
  margin-right: 6px;
  font-size: 16px;
  line-height: 19.09px;
  color: #ffffff;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  background-color: #2f2f2f;
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  ${HiddenCheckbox}:checked + & {
    background-color: #2f2f2f;
  }

  &::after {
    content: '';
    position: absolute;
    width: 14px; /* Internal square size */
    height: 14px; /* Internal square size */
    background-color: ${({ checked }) => (checked ? '#00DDA8' : '#2F2F2F')};
    border-radius: 1px;
    top: 2px;
    left: 2px;
  }
`;

// Type definitions for PositionCheckbox props
interface PositionCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const PositionCheckbox: React.FC<PositionCheckboxProps> = ({ checked, onChange }) => (
  <>
    <HiddenCheckbox checked={checked} onChange={onChange} />
    <StyledCheckbox checked={checked} onClick={onChange} />
  </>
);

// List of positions
const positions = ['프론트', '백', '디자인'];

// Type definitions for PositionSector props
interface PositionSectorProps {
  labelName: string;
  value: string;
  onChange: (position: string) => void;
}

const PositionSector: React.FC<PositionSectorProps> = ({ labelName, value, onChange }) => {
  return (
    <PositionContainer>
      <PositionLabel>
        <SignupWhite text={labelName} />
      </PositionLabel>
      <Positions>
        {positions.map((position) => (
          <div
            key={position}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '10px',
            }}
          >
            <PositionCheckbox
              checked={value === position}
              onChange={() => onChange(position)}
            />
            <PositionName>{position}</PositionName>
          </div>
        ))}
      </Positions>
    </PositionContainer>
  );
};

export default PositionSector;
