import styled from 'styled-components';
import LeftButton from '@/components/Header/LeftButton';
import TextButton from '@/components/Header/TextButton';
import theme from '@/styles/theme';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px; //기본 헤더 마진
`;

interface LoginHeaderProps {
  isRightButtonEnabled: boolean;
  onCompleteClick: () => void;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({
  isRightButtonEnabled,
  onCompleteClick,
}) => {
  return (
    <StyledHeader>
      <LeftButton />
      <TextButton
        text="완료"
        color={isRightButtonEnabled ? 'mainColor' : 'default'}
        onClick={onCompleteClick}
      />
    </StyledHeader>
  );
};

export default LoginHeader;