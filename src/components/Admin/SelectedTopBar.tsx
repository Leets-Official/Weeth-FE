import Button from '@/components/Button/Button';
import theme from '@/styles/theme';
import styled from 'styled-components';
import { useMemberContext } from './context/MemberContext';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.color.main};
  color: ${theme.color.gray[100]};
`;
const SelectedTopBar: React.FC = () => {
  const { selectedMembers, setSelectedMembers } = useMemberContext();

  return (
    <Container>
      <div>{`${selectedMembers.length}명 선택됨`}</div>
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
    </Container>
  );
};

export default SelectedTopBar;
