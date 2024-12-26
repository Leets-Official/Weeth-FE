import { useState } from 'react';
import styled from 'styled-components';
import CheckBox from '@/assets/images/ic_admin_checkbox.svg';
import UnCheckBox from '@/assets/images/ic_admin_uncheckbox.svg';
import MeatBallSvg from '@/assets/images/ic_admin_meatball.svg';
import { statusColors } from './StatusIndicator';

const Row = styled.tr`
  border-bottom: 1px solid #dedede;
`;

const Cell = styled.td`
  padding: 15px;
  text-align: left;

  border-bottom: 1px solid #dedede;
`;
const StatusCell = styled.td<{ statusColor: string }>`
  width: 2px;
  background-color: ${({ statusColor }) => statusColor};
`;

const SvgWrapper = styled.td`
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

interface TableRowProps {
  data: Record<string, any>;
  columns: { key: string; header: string }[];
}

const MemberListTableRow: React.FC<TableRowProps> = ({ data, columns }) => {
  const statusColor = statusColors[data.status];
  const [isChecked, setIsChecked] = useState(false);

  const onClickToCheckBox = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <Row>
      <StatusCell statusColor={statusColor} />

      <SvgWrapper onClick={onClickToCheckBox}>
        <img
          src={isChecked ? CheckBox : UnCheckBox}
          alt={isChecked ? 'checked' : 'unchecked'}
        />
      </SvgWrapper>
      {columns.map((column) => (
        <Cell key={column.key}>{data[column.key]}</Cell>
      ))}

      {/* 추후 클릭 이벤트 추가 */}
      <SvgWrapper>
        <img src={MeatBallSvg} alt="미트볼 메뉴" />
      </SvgWrapper>
    </Row>
  );
};

export default MemberListTableRow;
