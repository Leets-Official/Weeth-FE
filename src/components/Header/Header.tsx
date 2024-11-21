/* eslint-disable react/require-default-props */
import under from '@/assets/images/ic_under.svg';
import TextButton from '@/components/Header/TextButton';
import * as S from '@/styles/common/Header.styled';
import LeftButton from './LeftButton';
import MenuButton from './MenuButton';
import PlusButton from './PlusButton';

interface HeaderProps {
  title?: string;
  onClickRightButton?: () => void;
  RightButtonType: 'TEXT' | 'MENU' | 'ADMIN' | 'none';
  isComplete?: boolean;
  isAccessible?: boolean;
  isCalendar?: boolean;
  year?: number;
  month?: number;
  isMonth?: boolean;
  isAdmin?: boolean;
  openMonthModal?: () => void;
}

const Header = ({
  title = '',
  onClickRightButton,
  RightButtonType,
  isComplete = true,
  isAccessible = true,
  isCalendar = false,
  // 아래의 props들은 캘린더에서만 사용됨
  year,
  month,
  isMonth,
  isAdmin,
  openMonthModal,
  // ---------------------------
}: HeaderProps) => {
  return (
    <S.HeaderWrapper>
      <LeftButton />

      {isCalendar ? (
        <S.DateWrapper>
          <S.Year>{year}년</S.Year>
          <S.Month>{isMonth ? `${month}월` : null}</S.Month>
          <S.ImgButton onClick={openMonthModal}>
            <img src={under} alt="select" />
          </S.ImgButton>
        </S.DateWrapper>
      ) : (
        <S.Title>{title}</S.Title>
      )}

      {RightButtonType === 'TEXT' && onClickRightButton && (
        <TextButton
          onClick={onClickRightButton}
          text="완료"
          isComplete={isComplete}
        />
      )}

      {RightButtonType === 'MENU' && onClickRightButton && isAccessible && (
        <MenuButton onClick={onClickRightButton} />
      )}

      {RightButtonType === 'ADMIN' && isAdmin && <PlusButton />}

      {RightButtonType === 'none' && <S.None />}
    </S.HeaderWrapper>
  );
};

export default Header;
