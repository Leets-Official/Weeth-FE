import CardinalSearchBar from '@/components/Admin/CardinalSearchBar';
import NavMenu from '@/components/Admin/NavMenu';
import TopBar from '@/components/Admin/TopBar';
import {
  Container,
  PageWrapper,
  ContentWrapper,
} from '@/styles/admin/AdminLayout.styled';
import { useState } from 'react';

const AdminPenalty: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState('기수');

  return (
    <PageWrapper>
      <NavMenu />
      <ContentWrapper>
        <TopBar
          title="패널티 관리"
          description="기수를 선택하고, 해당 멤버에 대한 패널티를 수정하는 페이지입니다."
        />
        <Container>
          <CardinalSearchBar
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={setSelectedCardinal}
          />
        </Container>
      </ContentWrapper>
    </PageWrapper>
  );
};
export default AdminPenalty;
