import { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface ToggleButtonProps {
  onToggle: (isMonth: boolean) => void;
}

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 343px;
  height: 32px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.color.grayScale.gray18};
  transition: 0.4s;
  border-radius: 10px;

  &:before {
    position: absolute;
    content: '';
    height: 28px;
    width: 170px;
    left: 2px;
    bottom: 2px;
    background-color: ${theme.color.grayScale.gray30};
    transition: 0.4s;
    border-radius: 9px;
    transform: ${(props) =>
      props.$isChecked ? 'translateX(169px)' : 'translateX(0)'};
  }
`;

const TextMonth = styled.span<{ $isChecked: boolean}>`
  position: absolute;
  left: 18%;
  color: ${(props) => (props.$isChecked ? '#a6a6a6' : '#ffffff')};
  //eslint 이슈로 색상코드를 작성하였음
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 12px;
  z-index: 1;
`;

const TextYear = styled.span<{ $isChecked: boolean }>`
  position: absolute;
  right: 22%;
  color: ${(props) => (props.$isChecked ? '#ffffff' : '#a6a6a6')};
  //eslint 이슈로 색상코드를 작성하였음
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 12px;
  z-index: 1;
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
  const [isMonth, setIsMonth] = useState(false);

  const handleToggle = () => {
    setIsMonth(!isMonth);
    onToggle(!isMonth);
  };

  return (
    <div>
      <Switch>
        <Checkbox type="checkbox" checked={isMonth} onChange={handleToggle} />
        <Slider $isChecked={isMonth}>
          <TextMonth $isChecked={isMonth}>Month</TextMonth>
          <TextYear $isChecked={isMonth}>Year</TextYear>
        </Slider>
      </Switch>
    </div>
  );
};

export default ToggleButton;
