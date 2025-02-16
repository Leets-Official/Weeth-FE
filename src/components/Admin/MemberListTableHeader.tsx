import styled from 'styled-components';

interface TableHeaderProps {
  columns: { key: string; header: string }[];
}

const HeaderCell = styled.th`
  text-align: left;
  padding: 10px 20px;
  font-weight: bold;
  border-bottom: 1px solid #dedede;
  white-space: nowrap;
`;

export const EmptyCell = styled.th`
  border-bottom: 1px solid #dedede;
`;

const MemberListTableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        <EmptyCell aria-label="Row Status" />
        <EmptyCell aria-label="Selection Checkbox" />

        {columns.map((column) => (
          <HeaderCell key={column.key}>{column.header}</HeaderCell>
        ))}
      </tr>
    </thead>
  );
};

export default MemberListTableHeader;
