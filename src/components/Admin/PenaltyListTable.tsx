import React, { useState } from 'react';
import styled from 'styled-components';
import plusIcon from '@/assets/images/ic_admin_plus.svg';
import { useMemberContext, MemberData } from './context/MemberContext';
import PenaltyDetail from './PenaltyDetail';
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
`;

const ExpandedRow = styled.tr`
  background-color: #eaf8f6;
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
  padding: 10px;
  font-weight: bold;
  background-color: #f0f9f6;
  text-align: left;
  white-space: nowrap;
`;

const columns = [
  { key: 'name', header: '이름' },
  { key: 'role', header: '역할' },
  { key: 'major', header: '학과' },
  { key: 'studentId', header: '학번' },
  { key: 'penalty', header: '패널티' },
  { key: 'LatestPenalty', header: '최근 패널티' },
];

const PenaltyListTable: React.FC = () => {
  const { members } = useMemberContext();
  const filteredMembers = members.filter(
    (member) => member.status === '승인 완료',
  );

  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleRowClick = (studentId: string) => {
    if (expandedRow === studentId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(studentId);
    }
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
                {/* 메인 Row */}
                <Row onClick={() => handleRowClick(member.studentId)}>
                  <StatusCell statusColor={statusColors[member.status]} />
                  <PlusButtonCell>
                    <img src={plusIcon} alt="plus-icon" />
                  </PlusButtonCell>
                  {columns.map((column) => (
                    <Cell key={column.key}>{member[column.key]}</Cell>
                  ))}
                </Row>

                {/* 확장 Row */}
                {expandedRow === member.studentId && (
                  <>
                    <ExpandedRow>
                      <SubHeaderCell>사유</SubHeaderCell>
                      <SubHeaderCell>패널티</SubHeaderCell>
                      <SubHeaderCell>패널티 일자</SubHeaderCell>
                      <SubHeaderCell />
                    </ExpandedRow>
                    <PenaltyDetail member={member} />
                  </>
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
