import React, { useState } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import plusIcon from '@/assets/images/ic_admin_plus.svg';
import { useMemberContext } from './context/MemberContext';
import PenaltyDetail from './PenaltyDetail';
import PenaltyAdd from './PenaltyAdd';
import { statusColors } from './StatusIndicator';
import { StatusCell } from './MemberListTableRow';

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
    <S.TableContainer>
      <S.TableWrapper>
        <table>
          <thead>
            <tr>
              <th aria-label="Status Indicator" />
              <th aria-label="Plus Button" />
              {columns.map((column) => (
                <S.HeaderCell key={column.key}>{column.header}</S.HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <React.Fragment key={member.studentId}>
                <S.Row onClick={() => handleRowClick(member.studentId)}>
                  <StatusCell statusColor={statusColors[member.status]} />
                  <S.PlusButtonCell
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddPenalty(member.studentId);
                    }}
                  >
                    <img src={plusIcon} alt="plus-icon" />
                  </S.PlusButtonCell>
                  {columns.map((column) =>
                    column.key === 'empty' ? (
                      <S.EmptyCell key={column.key} />
                    ) : (
                      <S.Cell key={column.key}>{member[column.key]}</S.Cell>
                    ),
                  )}
                </S.Row>

                {expandedRow === member.studentId && (
                  <>
                    <S.ExpandedRow>
                      <td colSpan={columns.length + 2}>
                        <S.SubHeaderRow>
                          <S.GridCell area="reason">사유</S.GridCell>
                          <S.GridCell area="penalty">패널티</S.GridCell>
                          <S.GridCell area="penaltyDate">
                            패널티 일자
                          </S.GridCell>
                        </S.SubHeaderRow>
                      </td>
                    </S.ExpandedRow>

                    {penaltyData[member.studentId]?.map((penalty, index) => (
                      <S.ExpandedRow key={index}>
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
                      </S.ExpandedRow>
                    ))}

                    {isAdding && (
                      <S.ExpandedRow>
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
                      </S.ExpandedRow>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </S.TableWrapper>
    </S.TableContainer>
  );
};

export default PenaltyListTable;
