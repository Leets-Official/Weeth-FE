import styled from 'styled-components';
import CheckBox from '@/assets/images/ic_admin_checkbox.svg';
import UnCheckBox from '@/assets/images/ic_admin_uncheckbox.svg';
import { StatusCell, SvgWrapper } from '@/components/Admin/MemberListTableRow';
import { useMemberContext } from '@/components/Admin/context/MemberContext';
import { statusColors } from './StatusIndicator';

interface TableHeaderProps {
  columns: { key: string; header: string; width: string }[];
  memberIds: string[];
}

const HeaderCell = styled.th<{ width?: string }>`
  text-align: left;
  padding: 18px;
  font-weight: bold;
  border-bottom: 1px solid #dedede;
  white-space: nowrap;
  width: ${({ width }) => width || 'auto'};
`;

export const EmptyCell = styled.th`
  border-bottom: 1px solid #dedede;
`;

const HeaderRow = styled.tr`
  border-bottom: 1px solid #dedede;
`;

const MemberListTableHeader: React.FC<TableHeaderProps> = ({
  columns,
  memberIds = [],
}) => {
  const { selectedMembers, setSelectedMembers } = useMemberContext();

  const selectedMembersSafe = selectedMembers || [];
  const memberIdsSafe = memberIds || [];

  const isAllChecked =
    memberIdsSafe.length > 0 &&
    selectedMembersSafe.length === memberIdsSafe.length;

  const onClickToCheckBox = () => {
    setSelectedMembers(isAllChecked ? [] : memberIds);
  };

  return (
    <thead>
      <HeaderRow>
        <StatusCell statusColor={statusColors['승인 완료']} />

        <SvgWrapper onClick={onClickToCheckBox}>
          <img
            src={isAllChecked ? CheckBox : UnCheckBox}
            alt={isAllChecked ? 'checked' : 'unchecked'}
          />
        </SvgWrapper>

        {columns.map((column) => (
          <HeaderCell key={column.key} width={column.width}>
            {column.header}
          </HeaderCell>
        ))}
      </HeaderRow>
    </thead>
  );
};

export default MemberListTableHeader;
