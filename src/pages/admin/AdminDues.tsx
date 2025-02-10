import NavMenu from '@/components/Admin/NavMenu';
import styled from 'styled-components';
import TopBar from '@/components/Admin/TopBar';
import { PageWrapper } from '@/styles/admin/AdminLayout.styled';
import TotalDues from '@/components/Admin/TotalDues';
import Expenditure from '@/components/Admin/Expenditure';
import DuesRegisterAdd from '@/components/Admin/DuesRegisterAdd';
import { useState } from 'react';
import DuesRegister from '@/components/Admin/DuesRegister';
import TotalCardinal from '@/components/Admin/CardinalWrapper';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #f2f2f2;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 50%;
  margin-left: 30px;
  margin-top: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const DuesWrapper = styled.div`
  width: 90%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const DuesRegisterWrapper = styled.div`
  width: 50%;
`;

const AdminDues: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<null | number>(null);

  const getDuesText = () => {
    if (selectedCardinal === null) return '기수 정보 없음';
    return `${selectedCardinal}기 회비(3월 이월금 + ${selectedCardinal}기 회비)`;
  };

  return (
    <PageWrapper>
      <NavMenu />
      <ContentWrapper>
        <TopBar
          title="회비 관리"
          description="기수 시작시 이월된 회비와 해당 기수 회비를 종합해 회비를 등록해주시기 바랍니다. 회비 등록은 기수당 한 번만 가능합니다."
        />
        <Wrapper>
          <Container>
            <TotalCardinal
              selectedCardinal={selectedCardinal}
              setSelectedCardinal={setSelectedCardinal}
            />
            <DuesWrapper>
              <TotalDues
                getDuesText={getDuesText}
                cardinal={selectedCardinal}
              />
              <Expenditure cardinal={selectedCardinal} />
            </DuesWrapper>
          </Container>
          <DuesRegisterWrapper>
            <DuesRegister />
            <DuesRegisterAdd />
          </DuesRegisterWrapper>
        </Wrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};
export default AdminDues;
