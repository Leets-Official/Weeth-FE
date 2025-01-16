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
const SubHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 80px 95px 190px 120px;
  grid-template-areas: 'reason empty penalty penaltyDate actions';
  gap: 10px;
  padding: 5px;
  padding-left: 70px;
  background-color: #e6fcf7;
  font-weight: bold;
`;

// const ContentRow = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 85px 80px 90px 150px;
//   grid-template-areas: 'reasonContent penaltyContent penaltyDateContent emptyContent actions'; /* 그리드 이름 설정 */
//   padding: 10px;
// `;

const GridCell = styled.div<{ area: string }>`
  grid-area: ${(props) => props.area};
  padding: 5px;
  text-align: left;
  white-space: nowrap;
`;
const ExpandedRow = styled.tr`
  td {
    grid-column: 1 / -1;
  }
`;

const EmptyCell = styled.td`
  background-color: #f9f9f9;
  width: 150px;
`;

const columns = [
  { key: 'name', header: '이름' },
  { key: 'role', header: '역할' },
  { key: 'major', header: '학과' },
  { key: 'studentId', header: '학번' },
  { key: 'penalty', header: '패널티' },
  { key: 'LatestPenalty', header: '최근 패널티' },
  { key: 'empty', header: '' },
];

const PenaltyListTable: React.FC = () => {
  const { members } = useMemberContext();
  const filteredMembers = members.filter(
    (member) => member.status === '승인 완료',
  );

  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [penaltyData, setPenaltyData] = useState<
    Record<
      string,
      { reason: string; penalty: string; penaltyDate: string } | null
    >
  >({});

  const handleRowClick = (studentId: string) => {
    if (isAdding) return;
    setExpandedRow((prev) => (prev === studentId ? null : studentId));
  };

  const handleAddPenalty = (studentId: string) => {
    setIsAdding(true);
    setExpandedRow(studentId);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleSavePenalty = (
    studentId: string,
    data: { reason: string; penalty: string; penaltyDate: string },
  ) => {
    setPenaltyData((prev) => ({
      ...prev,
      [studentId]: data,
    }));
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
                  {columns.map((column) =>
                    column.key === 'empty' ? (
                      <EmptyCell key={column.key} />
                    ) : (
                      <Cell key={column.key}>{member[column.key]}</Cell>
                    ),
                  )}
                </Row>

                {/* 클릭 시 나오는 확장 row */}
                {expandedRow === member.studentId && (
                  <>
                    {/* SubHeaderRow */}
                    <ExpandedRow>
                      <td colSpan={columns.length + 2}>
                        <SubHeaderRow>
                          <GridCell area="reason">사유</GridCell>
                          <GridCell area="penalty">패널티</GridCell>
                          <GridCell area="penaltyDate">패널티 일자</GridCell>
                        </SubHeaderRow>
                      </td>
                    </ExpandedRow>

                    {/* 추가 컴포넌트 Row */}
                    <ExpandedRow>
                      <td colSpan={columns.length + 2}>
                        {isAdding ? (
                          <PenaltyAdd
                            // member={member}
                            onCancel={handleCancelAdd}
                            onSave={(data) =>
                              handleSavePenalty(member.studentId, data)
                            }
                          />
                        ) : (
                          <PenaltyDetail
                            member={member}
                            penaltyData={penaltyData[member.studentId]!}
                            onEdit={() => handleAddPenalty(member.studentId)}
                            onDelete={() =>
                              setPenaltyData((prev) => ({
                                ...prev,
                                [member.studentId]: null,
                              }))
                            }
                          />
                        )}
                      </td>
                    </ExpandedRow>
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
