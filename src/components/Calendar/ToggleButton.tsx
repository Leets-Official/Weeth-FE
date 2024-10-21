import * as S from '@/styles/calendar/ToggleButton.styled';
import { useState } from 'react';

interface ToggleButtonProps {
  onToggle: (isMonth: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
  const [isMonth, setIsMonth] = useState(false);

  const handleToggle = () => {
    setIsMonth(!isMonth);
    onToggle(!isMonth);
  };

  return (
    <div>
      <S.Switch>
        <S.Checkbox type="checkbox" checked={isMonth} onChange={handleToggle} />
        <S.Slider $isChecked={isMonth}>
          <S.TextMonth $isChecked={isMonth}>Month</S.TextMonth>
          <S.TextYear $isChecked={isMonth}>Year</S.TextYear>
        </S.Slider>
      </S.Switch>
    </div>
  );
};

export default ToggleButton;
