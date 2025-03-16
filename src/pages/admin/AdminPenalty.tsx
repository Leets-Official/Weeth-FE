import CardinalSearchBar from '@/components/Admin/CardinalSearchBar';
import { MemberProvider } from '@/components/Admin/context/MemberContext';
import {
  penaltyReducer,
  PenaltyState,
} from '@/components/Admin/context/PenaltyReducer';
import NavMenu from '@/components/Admin/NavMenu';
import PenaltyAdd from '@/components/Admin/PenaltyAdd';
import PenaltyListTable from '@/components/Admin/PenaltyListTable';
import TopBar from '@/components/Admin/TopBar';
import AdminOnly from '@/components/common/AdminOnly';
import {
  PageWrapper,
  ContentWrapper,
  Container,
} from '@/styles/admin/AdminLayout.styled';
import { useReducer, useState } from 'react';
import styled from 'styled-components';

export const PenaltyContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const AdminPenalty: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<null | number>(null);
  const [searchName, setSearchName] = useState<string>('');
  const [penaltyData, dispatch] = useReducer(
    penaltyReducer,
    {} as PenaltyState,
  );

  return (
    <MemberProvider>
      <AdminOnly isAdminPage />
      <PageWrapper>
        <NavMenu />
        <ContentWrapper>
          <TopBar
            title="패널티 관리"
            description="기수를 선택하고, 해당 멤버에 대한 패널티를 수정하는 페이지입니다."
          />
          <PenaltyContainer>
            <div>
              <CardinalSearchBar
                isPenaltyPage
                selectedCardinal={selectedCardinal}
                setSelectedCardinal={setSelectedCardinal}
                searchName={searchName}
                setSearchName={setSearchName}
              />
              <PenaltyListTable
                selectedCardinal={selectedCardinal}
                searchName={searchName}
                penaltyData={penaltyData}
                dispatch={dispatch}
              />
            </div>
            <PenaltyAdd dispatch={dispatch} />
          </PenaltyContainer>
        </ContentWrapper>
      </PageWrapper>
    </MemberProvider>
  );
};
export default AdminPenalty;
