import React, { useState } from 'react';
import styled from 'styled-components';
import plusIcon from '@/assets/images/ic_admin_plus.svg';
import { useMemberContext } from './context/MemberContext';
import PenaltyDetail from './PenaltyDetail';
import PenaltyAdd from './PenaltyAdd';
import { statusColors } from './StatusIndicator';
import { StatusCell } from './MemberListTableRow';

const TableWrapper = styled.div`
  width: 100%;
  font-size: 18px;
  border-collapse: collapse;
`;

const TableContainer = styled.div`
  background-color: #fff;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(133, 141, 138, 0.2);
  padding: 20px;
  box-sizing: border-box;
`;

const Row = styled.tr`
  border-bottom: 1px solid #dedede;
  cursor: pointer;
`;

const ExpandedRow = styled.tr`
  background-color: #f9f9f9;
`;

const SubHeaderRow = styled.div`
  display: flex;
  background-color: #e6fcf7;
  font-weight: bold;
  padding: 10px;
`;

const Cell = styled.td`
  padding: 15px;
  text-align: left;
  white-space: nowrap;
`;

const PlusButtonCell = styled.td`
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

const HeaderCell = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #dedede;
  font-weight: bold;
`;

const SubHeaderCell = styled.td`
  flex: 1;
  font-weight: bold;
  text-align: left;
  white-space: nowrap;
`;

const columns = [
  { key: 'name', header: '이름' },
  { key: 'role', header: '역할' },
  { key: 'major', header: '학과' },
  { key: 'studentId', header: '학번' },
  { key: 'penalty', header: '패널티' },
  { key: 'latestPenalty', header: '최근 패널티' },
];

const PenaltyListTable: React.FC = () => {
  const { members } = useMemberContext();
  const filteredMembers = members.filter(
    (member) => member.status === '승인 완료',
  );

  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleRowClick = (studentId: string) => {
    if (isAdding) return; // 추가 중에는 클릭 비활성화
    setExpandedRow((prev) => (prev === studentId ? null : studentId));
  };

  const handleAddPenalty = (studentId: string) => {
    setIsAdding(true);
    setExpandedRow(studentId); // 추가 시 해당 행 확장
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  return (
    <TableContainer>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th aria-label="Status Indicator" />
              <th aria-label="Plus Button" />
              {columns.map((column) => (
                <HeaderCell key={column.key}>{column.header}</HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <React.Fragment key={member.studentId}>
                {/* 기본 테이블 row */}
                <Row onClick={() => handleRowClick(member.studentId)}>
                  <StatusCell statusColor={statusColors[member.status]} />
                  <PlusButtonCell
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddPenalty(member.studentId);
                    }}
                  >
                    <img src={plusIcon} alt="plus-icon" />
                  </PlusButtonCell>
                  {columns.map((column) => (
                    <Cell key={column.key}>{member[column.key]}</Cell>
                  ))}
                </Row>

                {/* 클릭 시 나오는 확장 row */}
                {expandedRow === member.studentId && (
                  <ExpandedRow>
                    <td colSpan={columns.length + 2}>
                      <SubHeaderRow>
                        <SubHeaderCell>사유</SubHeaderCell>
                        <SubHeaderCell>패널티</SubHeaderCell>
                        <SubHeaderCell>패널티 일자</SubHeaderCell>
                        <SubHeaderCell />
                      </SubHeaderRow>
                      {isAdding ? (
                        <PenaltyAdd
                          member={member}
                          onCancel={handleCancelAdd}
                        />
                      ) : (
                        <PenaltyDetail member={member} />
                      )}
                    </td>
                  </ExpandedRow>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </TableContainer>
  );
};

export default PenaltyListTable;
