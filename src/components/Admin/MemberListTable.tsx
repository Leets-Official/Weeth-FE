import styled from 'styled-components';
import MemberListTableHeader from '@/components/Admin/MemberListTableHeader';
import MemberListTableRow from '@/components/Admin/MemberListTableRow';
import StatusList from '@/components/Admin/StatusList';
import {
  MemberData,
  useMemberContext,
} from '@/components/Admin/context/MemberContext';
import theme from '@/styles/theme';

export interface Column {
  key: keyof MemberData;
  header: string;
  width: string;
}

export interface MemberListTableProps {
  columns: Column[];
}

export const TableWrapper = styled.div`
  width: 100%;
  font-size: 18px;
  border-collapse: collapse;
  padding-bottom: 40px;
`;

export const TableContainer = styled.div`
  background-color: #fff;
  width: 100%;
  min-width: 1400px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(133, 141, 138, 0.2);
  padding: 20px;
  box-sizing: border-box;

  table {
    border-collapse: collapse;
    table-layout: fixed;
  }
`;

export const NoDataRow = styled.tr`
  height: 80px;
  text-align: center;
`;

export const NoDataCell = styled.td`
  padding: 20px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  color: ${theme.color.gray[65]};
`;

const MemberListTable: React.FC<MemberListTableProps> = ({ columns }) => {
  const { filteredMembers } = useMemberContext();
  const memberIds = filteredMembers.map((member) => String(member.id));

  return (
    <TableContainer>
      <StatusList />
      <TableWrapper>
        <table>
          <MemberListTableHeader columns={columns} memberIds={memberIds} />
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((row) => (
                <MemberListTableRow key={row.id} columns={columns} data={row} />
              ))
            ) : (
              <NoDataRow>
                <NoDataCell colSpan={columns.length}>
                  검색된 멤버가 없습니다.
                </NoDataCell>
              </NoDataRow>
            )}
          </tbody>
          {filteredMembers.length > 0 && (
            <MemberListTableHeader columns={columns} memberIds={memberIds} />
          )}
        </table>
      </TableWrapper>
    </TableContainer>
  );
};

export default MemberListTable;
