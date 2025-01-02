import Button from '@/components/Button/Button';
import theme from '@/styles/theme';
import backarrow from '@/assets/images/ic_admin_backarrow.svg';
import styled from 'styled-components';
import { useMemberContext } from './context/MemberContext';
import { Title } from './TopBar';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-right: 20px;
`;

const SelectedTopBarWrapper = styled.div`
  width: 100%;
  background-color: ${theme.color.main};
  color: ${theme.color.gray[100]};
  display: flex;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  padding-left: 55px;
`;

const BackArrow = styled.img`
  cursor: pointer;
`;
const SelectedTopBar: React.FC = () => {
  const { selectedMembers, setSelectedMembers } = useMemberContext();

  const handleBackClick = () => {
    setSelectedMembers([]);
  };
  return (
    <SelectedTopBarWrapper>
      <TitleContainer>
        <BackArrow src={backarrow} alt="뒤로가기" onClick={handleBackClick} />
        <Title>{`${selectedMembers.length}명 선택됨`}</Title>
      </TitleContainer>
      <ButtonGroup>
        <Button
          color="#fff"
          textcolor="#000"
          width="99px"
          height="48px"
          borderRadius="4px"
          onClick={() => alert('가입 승인')}
        >
          가입 승인
        </Button>
        <Button
          color="#fff"
          textcolor="#000"
          width="99px"
          height="48px"
          borderRadius="4px"
          onClick={() => alert('가입 승인')}
        >
          관리자로 변경
        </Button>
        <Button
          color="#fff"
          textcolor="#000"
          width="99px"
          height="48px"
          borderRadius="4px"
          onClick={() => alert('가입 승인')}
        >
          사용자로 변경
        </Button>
        <Button
          color="#fff"
          textcolor="#000"
          width="99px"
          height="48px"
          borderRadius="4px"
          onClick={() => alert('가입 승인')}
        >
          비밀번호 초기화
        </Button>
        <Button
          color="#fff"
          textcolor="#000"
          width="99px"
          height="48px"
          borderRadius="4px"
          onClick={() => alert('가입 승인')}
        >
          유저 추방
        </Button>
        <Button
          color="#fff"
          textcolor="#000"
          width="99px"
          height="48px"
          borderRadius="4px"
          onClick={() => alert('가입 승인')}
        >
          변경 기수
        </Button>
        <Button
          color="#fff"
          textcolor="#000"
          width="99px"
          height="48px"
          borderRadius="4px"
          onClick={() => alert('가입 승인')}
        >
          직접 입력
        </Button>
      </ButtonGroup>
    </SelectedTopBarWrapper>
  );
};

export default SelectedTopBar;
