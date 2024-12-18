/* eslint-disable react/require-default-props */
/*

<        헤더       완료
left    title     right

필수 props는 RightButtonType 하나입니다.
그 외 props는 필요에 따라 전달하여 사용하시면 됩니다.

title: 헤더 중앙에 사용될 텍스트
onClickRightButton: right 버튼이 클릭되었을 때 사용할 함수
                    🚨right버튼이 없는 경우도 있기 때문에 필수 props가 아닙니다
                    해당 값이 전달되지 않았을 때 에러가 발생하지 않으므로, right버튼 사용시 전달여부를 꼭 확인해주세요!
isComplete: right 버튼이 페이지 내의 입력 여부에 대한 boolean 타입의 state값으로 전달해주시면 됩니다.
            모든 값이 입력되었을 때 텍스트 색상을 mainColor를 바꾸기 위한 값입니다.
isAccessible: 접근 가능 여부에 대한 값을 전달해주시면 됩니다. ex) 어드민, 게시글/댓글 작성자
isCalendar: 캘린더에서 사용되는 헤더이면 true, 그 외의 페이지에서는 모두 false
            default값이 false이므로, false인 경우엔 값을 전달하지 않아도 됩니다.

그 외의 props는 CalendarHeader.tsx에서만 사용되므로, 해당 파일을 확인해주시길 바랍니다.

RightButton이 사용되지 않을 경우, 'none'으로 지정해주시면 됩니다.

RightButtonType
TEXT : 텍스트타입의 버튼입니다. 현재(2024.11.22)는 '완료'로만 사용되고 있습니다.
MENU : 점 세개(⋮) 버튼입니다.
PLUS : 캘린더에서 사용되는 +버튼입니다.

*/

import under from '@/assets/images/ic_under.svg';
import TextButton from '@/components/Header/TextButton';
import * as S from '@/styles/common/Header.styled';
import LeftButton from './LeftButton';
import MenuButton from './MenuButton';
import PlusButton from './PlusButton';

interface HeaderProps {
  title?: string;
  onClickRightButton?: () => void;
  RightButtonType: 'TEXT' | 'MENU' | 'PLUS' | 'none';
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

      {RightButtonType === 'PLUS' && isAdmin && <PlusButton />}

      {RightButtonType === 'none' && <S.None />}
    </S.HeaderWrapper>
  );
};

export default Header;
