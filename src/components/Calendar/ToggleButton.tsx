import * as S from '@/styles/calendar/ToggleButton.styled';
import { useState } from 'react';

const ToggleButton = ({
  onToggle,
}: {
  onToggle: (isMonth: boolean) => void;
}) => {
  const [isMonth, setIsMonth] = useState(false);

  const handleToggle = () => {
    setIsMonth(!isMonth);
    onToggle(!isMonth);
  };

  return (
    <S.Switch>
      <S.Checkbox type="checkbox" onChange={handleToggle} />
      <S.Slider $isMonth={isMonth}>
        <S.TextMonth $isMonth={isMonth}>Month</S.TextMonth>
        <S.TextYear $isMonth={isMonth}>Year</S.TextYear>
      </S.Slider>
    </S.Switch>
  );
};

export default ToggleButton;
