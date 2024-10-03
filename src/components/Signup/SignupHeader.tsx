import styled from 'styled-components';
import LeftButton from '@/components/Header/LeftButton';
import TextButton from '@/components/Header/TextButton';

interface SignupHeaderProps {
  isRightButtonEnabled: boolean;
  onClickTextButton: () => void;
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px; //기본 헤더 마진
`;

const SignupHeader: React.FC<SignupHeaderProps> = ({ isRightButtonEnabled, onClickTextButton }) => {
  return (
    <StyledHeader>
      <LeftButton />
      <TextButton
        onClick={onClickTextButton}
        text="완료"
        color={isRightButtonEnabled ? 'mainColor' : 'default'}
      />
    </StyledHeader>
  );
};

export default SignupHeader;
