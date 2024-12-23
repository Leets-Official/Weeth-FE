import styled from 'styled-components';

interface TableHeaderProps {
  columns: { key: string; header: string }[];
}

const HeaderCell = styled.th`
  text-align: left;
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #dedede;
`;

const MemberListTableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <HeaderCell key={column.key}>{column.header}</HeaderCell>
        ))}
      </tr>
    </thead>
  );
};

export default MemberListTableHeader;
