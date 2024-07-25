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
  margin-bottom: 33px;
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
  margin-right: 6px;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  color: #ffffff;
`;

/* 버튼은 width가 px로 고정이어서 일단 width를 %로 안 넣고 px로 넣었습니다..  */
const RoleButton = styled.button`
  position: relative;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  background-color: #2F2F2F;
  border: none;
  border-radius: 1px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 14px;  /* 내부 정사각형 크기 */
    height: 14px; /* 내부 정사각형 크기 */
    top: 2px;     /* 바깥쪽 여백 */
    left: 2px;    /* 바깥쪽 여백 */
    background-color: ${({ selected }) => (selected ? '#00DDA8' : '#2F2F2F')};
    border-radius: 1px;
`;

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
            <RoleButton
              selected={value === role}
              onClick={() => onChange(role)}
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
