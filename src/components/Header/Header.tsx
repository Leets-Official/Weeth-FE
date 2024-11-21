import icLeft from '@/assets/images/ic_left.svg';
import icMenu from '@/assets/images/ic_menu.svg';
import TextButton from '@/components/Header/TextButton';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px;
`;

const ImgButton = styled.img`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

interface HeaderProps {
  title: string;
  onClickRightButton: () => void;
  RightButtonType: 'TextButton' | 'MenuButton';
  // eslint-disable-next-line react/require-default-props
  isAccessible?: boolean;
  // eslint-disable-next-line react/require-default-props
  isCalendar?: boolean;
}

const Header = ({
  title,
  onClickRightButton,
  RightButtonType,
  isAccessible = true,
  isCalendar = false,
}: HeaderProps) => {
  const isComplete = true;

  return (
    <StyledHeader>
      <ImgButton
        onClick={() => {
          useCustomBack('/');
        }}
        src={icLeft}
        alt="뒤로가기"
      />

      {!isCalendar && <Title>{title}</Title>}

      {RightButtonType === 'TextButton' && (
        <TextButton
          onClick={onClickRightButton}
          text="완료"
          isComplete={isComplete}
        />
      )}

      {RightButtonType === 'MenuButton' && isAccessible && (
        <ImgButton onClick={onClickRightButton} src={icMenu} alt="menu" />
      )}
    </StyledHeader>
  );
};

export default Header;
