import styled from 'styled-components';

interface TableHeaderProps {
  columns: { key: string; header: string }[];
}
const HeaderRow = styled.tr`
  background-color: #f9f9f9;
`;

const HeaderCell = styled.th`
  text-align: left;
  padding: 10px;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
`;

const MemberListTableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <HeaderRow>
        {columns.map((column) => (
          <HeaderCell key={column.key}>{column.header}</HeaderCell>
        ))}
      </HeaderRow>
    </thead>
  );
};

export default MemberListTableHeader;
