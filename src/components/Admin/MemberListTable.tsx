import styled from 'styled-components';
import MemberListTableHeader from './MemberListTableHeader';
import MemberListTableRow from './MemberListTableRow';
import StatusList from './StatusList';

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
  /* height: max-content; */
  /* background-color: #fff; */
  font-size: 18px;
  /* margin-top: 30px; */
  /* box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2); */
  /* border-radius: 4px; */
  /* box-sizing: border-box; */
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

const MemberListTable: React.FC<MemberListTableProps> = ({ columns, data }) => {
  return (
    <TableContainer>
      <StatusList />
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
    </TableContainer>
  );
};

export default MemberListTable;
