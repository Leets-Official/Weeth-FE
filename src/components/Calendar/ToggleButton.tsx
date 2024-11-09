import * as S from '@/styles/calendar/ToggleButton.styled';

const ToggleButton = ({
  onToggle,
  isMonth,
}: {
  onToggle: () => void;
  isMonth: boolean;
}) => {
  // const handleToggle = () => {
  //   setIsMonth(!isMonth);
  //   onToggle(!isMonth);
  // };

  return (
    <S.Switch>
      <S.Checkbox type="checkbox" onChange={onToggle} />
      <S.Slider $isMonth={isMonth}>
        <S.TextMonth $isMonth={isMonth}>Month</S.TextMonth>
        <S.TextYear $isMonth={isMonth}>Year</S.TextYear>
      </S.Slider>
    </S.Switch>
  );
};

export default ToggleButton;
