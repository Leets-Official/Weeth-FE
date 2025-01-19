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
  padding-top: 10px;
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [penaltyData, setPenaltyData] = useState<
    Record<string, { reason: string; penalty: string; penaltyDate: string }[]>
  >({});

  const handleRowClick = (studentId: string) => {
    setExpandedRow((prev) => (prev === studentId ? null : studentId));
    setIsAdding(false);
  };

  const handleAddPenalty = (studentId: string) => {
    setIsAdding(true);
    setExpandedRow(studentId);
    setEditingIndex(null);
  };

  const handleEditPenalty = (studentId: string, index: number) => {
    setIsAdding(true);
    setExpandedRow(studentId);
    setEditingIndex(index);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleSavePenalty = (
    studentId: string,
    data: { reason: string; penalty: string; penaltyDate: string },
  ) => {
    setPenaltyData((prev) => {
      const updatedData = prev[studentId] ? [...prev[studentId]] : [];
      if (editingIndex !== null) {
        updatedData[editingIndex] = data;
      } else {
        updatedData.push(data);
      }
      return { ...prev, [studentId]: updatedData };
    });
    setIsAdding(false);
    setEditingIndex(null);
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

                {expandedRow === member.studentId && (
                  <>
                    <ExpandedRow>
                      <td colSpan={columns.length + 2}>
                        <SubHeaderRow>
                          <GridCell area="reason">사유</GridCell>
                          <GridCell area="penalty">패널티</GridCell>
                          <GridCell area="penaltyDate">패널티 일자</GridCell>
                        </SubHeaderRow>
                      </td>
                    </ExpandedRow>

                    {penaltyData[member.studentId]?.map((penalty, index) => (
                      <ExpandedRow key={index}>
                        <td colSpan={columns.length + 2}>
                          <PenaltyDetail
                            member={member}
                            penaltyData={penalty}
                            onEdit={() =>
                              handleEditPenalty(member.studentId, index)
                            }
                            onDelete={() => {
                              setPenaltyData((prev) => ({
                                ...prev,
                                [member.studentId]:
                                  prev[member.studentId]?.filter(
                                    (_, i) => i !== index,
                                  ) || [],
                              }));
                            }}
                          />
                        </td>
                      </ExpandedRow>
                    ))}

                    {isAdding && (
                      <ExpandedRow>
                        <td colSpan={columns.length + 2}>
                          <PenaltyAdd
                            onCancel={handleCancelAdd}
                            onSave={(data) =>
                              handleSavePenalty(member.studentId, data)
                            }
                            existingData={
                              editingIndex !== null
                                ? penaltyData[member.studentId]?.[editingIndex]
                                : undefined
                            }
                          />
                        </td>
                      </ExpandedRow>
                    )}
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
