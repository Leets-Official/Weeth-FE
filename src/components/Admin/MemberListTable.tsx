import styled from 'styled-components';
import MemberListTableHeader from './MemberListTableHeader';
import MemberListTableRow from './MemberListTableRow';
import StatusList from './StatusList';
import { useMemberContext } from './context/MemberContext';

export interface Column {
  key: string;
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
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(133, 141, 138, 0.2);
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

const MemberListTable: React.FC<MemberListTableProps> = ({ columns }) => {
  const { members } = useMemberContext(); // Cotext에서 멤버 데이터 가져오기
  return (
    <TableContainer>
      <StatusList />
      <TableWrapper>
        <table>
          <MemberListTableHeader columns={columns} />
          <tbody>
            {data.map((row) => (
              <MemberListTableRow
                key={row.studentId}
                columns={columns}
                data={row}
              />
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </TableContainer>
  );
};

export default MemberListTable;
