import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SignupWhite from './SignupWhite';

const RoleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 370px;
  max-width: 370px;
  margin: 8=10px 0 33px 0;
`;

const RoleLabel = styled.div`
  width: 10%;
  height: 19px;
  margin-left: 10%;
  margin-right: 5%;
  font-size: 16px;
  line-height: 19.09px;
`;

const Roles = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const RoleName = styled.div`
  width: auto;
  margin-left: 5px;
  margin-right: 6px;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  color: #ffffff;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const StyledCheckbox = styled.div`
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
    width: 14px; /* 내부 정사각형 크기 */
    height: 14px; /* 내부 정사각형 크기 */
    background-color: ${({ checked }) => (checked ? '#00DDA8' : '#2F2F2F')};
    border-radius: 1px;
    top: 2px;
    left: 2px;
  }
`;

const RoleCheckbox = ({ checked, onChange }) => (
  <>
    <HiddenCheckbox checked={checked} onChange={onChange} />
    <StyledCheckbox checked={checked} onClick={onChange} />
  </>
);

RoleCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const roles = ['프론트', '백', '디자인'];

const RoleSector = ({ labelName, value, onChange }) => {
  return (
    <RoleContainer>
      <RoleLabel>
        <SignupWhite text={labelName} />
      </RoleLabel>
      <Roles>
        {roles.map((role) => (
          <div
            key={role}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '10px',
            }}
          >
            <RoleCheckbox
              checked={value === role}
              onChange={() => onChange(role)}
            />
            <RoleName>{role}</RoleName>
          </div>
        ))}
      </Roles>
    </RoleContainer>
  );
};

RoleSector.propTypes = {
  labelName: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

RoleSector.defaultProps = {
  labelName: '역할',
};

export default RoleSector;
