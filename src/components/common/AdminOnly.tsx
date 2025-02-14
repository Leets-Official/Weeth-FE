import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import Button from '@/components/Button/Button';
import theme from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div<{ isAdminPage?: boolean }>`
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 100vw;
  height: 100vh;
  font-family: ${theme.font.semiBold};

  background-color: ${(props) =>
    props.isAdminPage ? '#fff' : theme.color.gray[18]};
  color: ${(props) => (props.isAdminPage ? '#000' : '#fff')};
`;

const AdminOnly = ({ isAdminPage }: { isAdminPage?: boolean }) => {
  const { isAdmin } = useGetGlobaluserInfo();
  const navigate = useNavigate();

  return (
    !isAdmin && (
      <Container isAdminPage={isAdminPage}>
        <div>운영진만 접근 가능합니다.</div>
        <Button
          onClick={() => {
            navigate('/');
          }}
          color={isAdminPage === true ? theme.color.main : theme.color.gray[30]}
        >
          서비스로 돌아가기
        </Button>
      </Container>
    )
  );
};

export default AdminOnly;
