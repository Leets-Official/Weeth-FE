import NextButton from './NextButton';
import PrevButton from './PrevButton';
import Title from './Title';

const Header = () => {
  return (
    <div>
      <PrevButton />
      <Title text="게시판" />
      <NextButton text="완료" />
      {/* <FinishButton text="다음" /> */}
    </div>
  );
};

export default Header;
