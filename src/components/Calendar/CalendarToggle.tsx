import theme from '@/styles/theme';
import styled from 'styled-components';

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 343px;
  height: 32px;
  margin-bottom: 15px;
`;

export const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Slider = styled.span<{ $isMonth: boolean }>`
  display: flex;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.color.gray[18]};
  transition: 0.4s;
  border-radius: 10px;

  &:before {
    position: absolute;
    content: '';
    height: 28px;
    width: 170px;
    left: 2px;
    bottom: 2px;
    background-color: ${theme.color.gray[30]};
    transition: 0.4s;
    border-radius: 9px;
    transform: ${(props) =>
      props.$isMonth ? 'translateX(0)' : 'translateX(169px)'};
  }
`;

export const TextMonth = styled.div<{ $isMonth: boolean }>`
  position: absolute;
  left: 18%;
  color: ${(props) =>
    props.$isMonth ? theme.color.gray[100] : theme.color.gray[65]};
  font-family: ${theme.font.semiBold};
  font-size: 12px;
  z-index: 1;
`;

export const TextYear = styled.div<{ $isMonth: boolean }>`
  position: absolute;
  right: 22%;
  color: ${(props) =>
    props.$isMonth ? theme.color.gray[65] : theme.color.gray[100]};
  font-family: ${theme.font.semiBold};
  font-size: 12px;
  z-index: 1;
`;

const CalendarToggle = ({
  onToggle,
  isMonth,
}: {
  onToggle: () => void;
  isMonth: boolean;
}) => {
  return (
    <Switch>
      <Checkbox type="checkbox" onChange={onToggle} />
      <Slider $isMonth={isMonth}>
        <TextMonth $isMonth={isMonth}>Month</TextMonth>
        <TextYear $isMonth={isMonth}>Year</TextYear>
      </Slider>
    </Switch>
  );
};

export default CalendarToggle;
