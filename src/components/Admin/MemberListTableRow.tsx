import styled from 'styled-components';
import CheckBox from '@/assets/images/ic_admin_checkbox.svg';
import UnCheckBox from '@/assets/images/ic_admin_uncheckbox.svg';
import MeatBallSvg from '@/assets/images/ic_admin_meatball.svg';
import { useState } from 'react';
import { statusColors } from '@/components/Admin/StatusIndicator';
import {
  MemberData,
  useMemberContext,
} from '@/components/Admin/context/MemberContext';
import { Column } from '@/components/Admin/MemberListTable';
import MemberDetailModal from '@/components/Admin/Modal/MemberDetailModal';

const Row = styled.tr`
  border-bottom: 1px solid #dedede;
`;

const Cell = styled.td`
  padding: 15px 20px;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #dedede;
  vertical-align: middle;
`;

export const StatusCell = styled.td<{ statusColor: string }>`
  width: 2px;
  min-width: 2px;
  background-color: ${({ statusColor }) => statusColor};
`;

export const SvgWrapper = styled.td`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #dedede;

  img {
    height: auto;
    display: block;
  }
`;

interface TableRowProps {
  data: MemberData;
  columns: Column[];
}

const MemberListTableRow: React.FC<TableRowProps> = ({ data, columns }) => {
  const { selectedMembers, setSelectedMembers } = useMemberContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isChecked = selectedMembers.includes(data.id.toString());

  const onClickToCheckBox = () => {
    setSelectedMembers((prevSelected) => {
      const updatedSelected = isChecked
        ? prevSelected.filter((id) => id !== String(data.id))
        : [...prevSelected, String(data.id)];

      return updatedSelected;
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Row>
        <StatusCell statusColor={statusColors[data.status]} />

        <SvgWrapper onClick={onClickToCheckBox}>
          <img
            src={isChecked ? CheckBox : UnCheckBox}
            alt={isChecked ? 'checked' : 'unchecked'}
          />
        </SvgWrapper>
        {columns.map((column) => (
          <Cell key={column.key}>{data[column.key]}</Cell>
        ))}

        <SvgWrapper onClick={openModal}>
          <img src={MeatBallSvg} alt="미트볼 메뉴" />
        </SvgWrapper>
      </Row>

      {isModalOpen && <MemberDetailModal data={data} onClose={closeModal} />}
    </>
  );
};

export default MemberListTableRow;
