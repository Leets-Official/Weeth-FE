import styled from 'styled-components';
import MemberListTableHeader from '@/components/Admin/MemberListTableHeader';
import MemberListTableRow from '@/components/Admin/MemberListTableRow';
import StatusList from '@/components/Admin/StatusList';
import {
  MemberData,
  useMemberContext,
} from '@/components/Admin/context/MemberContext';

export interface Column {
  key: keyof MemberData;
  header: string;
}

export interface MemberListTableProps {
  columns: Column[];
}

export const TableWrapper = styled.div`
  width: 100%;
  font-size: 18px;
  border-collapse: collapse;
`;

export const TableContainer = styled.div`
  background-color: #fff;
  width: fit-content;
  /* min-width: 1400px; */
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
            {filteredMembers.map((row) => (
              <MemberListTableRow key={row.id} columns={columns} data={row} />
            ))}
          </tbody>
          <MemberListTableHeader columns={columns} memberIds={memberIds} />
        </table>
      </TableWrapper>
    </TableContainer>
  );
};

export default MemberListTable;
