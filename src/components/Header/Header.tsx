/* eslint-disable react/require-default-props */
import TextButton from '@/components/Header/TextButton';
import theme from '@/styles/theme';
import styled from 'styled-components';
import LeftButton from './LeftButton';
import MenuButton from './MenuButton';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px;
`;

const Title = styled.div`
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const None = styled.div`
  width: 24px;
`;

interface HeaderProps {
  title?: string;
  onClickRightButton?: () => void;
  RightButtonType: 'TextButton' | 'MenuButton' | 'none';
  isComplete?: boolean;
  isAccessible?: boolean;
  isCalendar?: boolean;
}

const Header = ({
  title = '',
  onClickRightButton,
  RightButtonType,
  isComplete = true,
  isAccessible = true,
  isCalendar = false,
}: HeaderProps) => {
  return (
    <HeaderWrapper>
      <LeftButton />

      {!isCalendar && <Title>{title}</Title>}

      {RightButtonType === 'TextButton' && onClickRightButton && (
        <TextButton
          onClick={onClickRightButton}
          text="완료"
          isComplete={isComplete}
        />
      )}

      {RightButtonType === 'MenuButton' &&
        onClickRightButton &&
        isAccessible && <MenuButton onClick={onClickRightButton} />}

      {RightButtonType === 'none' && <None />}
    </HeaderWrapper>
  );
};

export default Header;
