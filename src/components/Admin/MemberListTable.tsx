import styled from 'styled-components';
import MemberListTableHeader from './MemberListTableHeader';
import MemberListTableRow from './MemberListTableRow';

export interface Column {
  key: string;
  header: string;
}

export interface MemberListTableProps {
  columns: Column[];
  data: Record<string, any>[];
}

export const TableWrapper = styled.div`
  width: 100%;
  height: max-content;
  background-color: #fff;
  margin-top: 30px;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
  border-radius: 4px;
`;

const MemberListTable: React.FC<MemberListTableProps> = ({ columns, data }) => {
  return (
    <TableWrapper>
      <table>
        <MemberListTableHeader columns={columns} />
        <tbody>
          {data.map((row, index) => (
            <MemberListTableRow key={index} columns={columns} data={row} />
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default MemberListTable;
