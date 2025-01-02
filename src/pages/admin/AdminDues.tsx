import NavMenu from '@/components/Admin/NavMenu';
import styled from 'styled-components';
import TopBar from '@/components/Admin/TopBar';
import Cardinal from '@/components/Admin/Cardinal';
import { PageWrapper } from '@/styles/admin/AdminLayout.styled';
import TotalDues from '@/components/Admin/TotalDues';
import Expenditure from '@/components/Admin/Expenditure';

import { useState } from 'react';
import DuesReigster from '@/components/Admin/DuesReigster';

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

const DuesReigsterWrapper = styled.div`
  width: 50%;
`;

const AdminDues: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState('기수');

  const getDuesText = () => {
    switch (selectedCardinal) {
      case '기수':
        return '기수 정보 없음';
      case '1기':
        return '1기 회비';
      case '2기':
        return '2기 회비';
      case '3기':
        return '3기 회비';
      case '4기':
        return '4기 회비';
      default:
        return '기수 정보 없음';
    }
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
            <Cardinal
              selectedCardinal={selectedCardinal}
              setSelectedCardinal={setSelectedCardinal}
            />
            <DuesWrapper>
              <TotalDues getDuesText={getDuesText} />
              <Expenditure />
            </DuesWrapper>
          </Container>
          <DuesReigsterWrapper>
            <DuesReigster />
          </DuesReigsterWrapper>
        </Wrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};
export default AdminDues;
