import styled from 'styled-components';

const Row = styled.tr`
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const Cell = styled.td`
  padding: 10px;
  text-align: left;
`;
interface TableRowProps {
  data: Record<string, any>;
  columns: { key: string; header: string }[];
}

const MemberListTableRow: React.FC<TableRowProps> = ({ data, columns }) => {
  return (
    <Row>
      {columns.map((column) => (
        <Cell key={column.key}>{data[column.key]}</Cell>
      ))}
    </Row>
  );
};

export default MemberListTableRow;
