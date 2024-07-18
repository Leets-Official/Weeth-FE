// ToggleSwitch.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 343px;
  height: 32px;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2f2f2f;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 28px;
    width: 170px;
    left: 4px;
    bottom: 2px;
    background-color: #4d4d4d;
    transition: 0.4s;
    border-radius: 20px;
    transform: ${(props) =>
      props.checked ? 'translateX(166px)' : 'translateX(0)'};
  }
`;

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <Switch>
        <Checkbox
          type="checkbox"
          checked={isToggled}
          onChange={handleToggle}
          text="text"
        />
        <Slider checked={isToggled} />
      </Switch>
    </div>
  );
};

export default ToggleSwitch;
