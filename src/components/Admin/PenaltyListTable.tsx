import React, { useEffect, useReducer, useState } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import plusIcon from '@/assets/images/ic_admin_plus.svg';
import {
  penaltyReducer,
  PenaltyState,
  Penalty,
} from '@/components/Admin/context/PenaltyReducer';
import { getPenaltyApi } from '@/api/admin/penalty/getPenalty';
import { useMemberContext } from './context/MemberContext';
import PenaltyDetail from './PenaltyDetail';
import PenaltyAdd from './PenaltyAdd';
import { statusColors } from './StatusIndicator';
import { StatusCell } from './MemberListTableRow';

const columns = [
  { key: 'name', header: '이름' },
  { key: 'position', header: '역할' },
  { key: 'department', header: '학과' },
  { key: 'studentId', header: '학번' },
  { key: 'penaltyCount', header: '패널티' },
  { key: 'LatestPenalty', header: '최근 패널티' },
  { key: 'empty', header: '' },
];

const PenaltyListTable: React.FC = () => {
  const { filteredMembers } = useMemberContext();
  const StatusfilteredMembers = filteredMembers.filter(
    (member) => member.status === '승인 완료',
  );

  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [penaltyData, dispatch] = useReducer(
    penaltyReducer,
    {} as PenaltyState,
  );

  const formatDate = (time: string | null | undefined) => {
    if (!time || isNaN(Date.parse(time))) return '날짜 없음'; // 값이 없거나 잘못된 날짜인 경우
    return new Date(time).toISOString().split('T')[0].replace(/-/g, '.');
  };

  const fetchPenaltyData = async (userId: number) => {
    try {
      const response = await getPenaltyApi();
      console.log('페널티 조회 API 응답: ', response);

      if (response.code === 200) {
        const penalties = response.data.reduce((acc, item) => {
          acc[item.userId] = item.Penalties.map((penalty: any) => ({
            penaltyId: penalty.penaltyId,
            penaltyDescription: penalty.penaltyDescription,
            penalty: '1',
            time: formatDate(penalty.time),
          }));
          return acc;
        }, {} as PenaltyState);

        dispatch({ type: 'SET_PENALTY', payload: penalties });
      }
    } catch (error: any) {
      console.error('패널티 조회 오류:', error.message);
    }
  };
  const handleRowClick = async (userId: number) => {
    if (expandedRow === userId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(userId);
      setIsAdding(false);
      await fetchPenaltyData(userId);
    }
  };
  const handleAddPenalty = (userId: number) => {
    setIsAdding(true);
    setExpandedRow(userId);
    setEditingIndex(null);
  };

  const handleEditPenalty = (userId: number, index: number) => {
    console.log('🛠 handleEditPenalty 실행됨:', { userId, index });

    setIsAdding(true);
    setExpandedRow(userId);

    setEditingIndex((prev) => {
      console.log(' 이전 editingIndex:', prev);
      return index; // 최신 값 업데이트
    });

    setTimeout(() => {
      console.log('setTimeout 후 editingIndex:', editingIndex);
    }, 100);
  };

  useEffect(() => {
    console.log('editingIndex 변경됨 (최신 값):', editingIndex);
  }, [editingIndex]);

  const handleCancelAdd = () => {
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleSavePenalty = (userId: number, data: Penalty) => {
    if (editingIndex !== null) {
      dispatch({
        type: 'EDIT_PENALTY',
        userId,
        index: editingIndex,
        payload: data,
      });
    } else {
      dispatch({ type: 'ADD_PENALTY', userId, payload: data });
    }
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleDeletePenalty = (userId: number, index: number) => {
    dispatch({ type: 'DELETE_PENALTY', userId, index });
  };

  const renderColumns = (member: Record<string, any>) =>
    columns.map((column) =>
      column.key === 'empty' ? (
        <S.EmptyCell key={column.key} />
      ) : (
        <S.Cell key={column.key}>{member[column.key]}</S.Cell>
      ),
    );

  useEffect(() => {
    fetchPenaltyData();
    console.log('📌 isAdding:', isAdding, 'editingIndex:', editingIndex);
  }, []);

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
            {StatusfilteredMembers.map((member) => (
              <React.Fragment key={member.id}>
                <S.Row
                  isSelected={expandedRow === member.id}
                  onClick={() => handleRowClick(member.id)}
                >
                  <StatusCell statusColor={statusColors[member.status]} />
                  <S.PlusButtonCell
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddPenalty(member.id);
                    }}
                  >
                    <img src={plusIcon} alt="plus-icon" />
                  </S.PlusButtonCell>
                  {renderColumns(member)}
                </S.Row>

                {expandedRow === member.id && (
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

                    {penaltyData[member.id]?.map((penalty, index) => (
                      <S.ExpandedRow key={`${member.id}-${penalty.penaltyId}`}>
                        <td colSpan={columns.length + 2}>
                          <PenaltyDetail
                            penaltyData={{
                              penaltyId: penalty.penaltyId,
                              penaltyDescription: penalty.penaltyDescription,
                              penalty: '1',
                              time: formatDate(penalty.time),
                            }}
                            onEdit={() => handleEditPenalty(member.id, index)}
                            onDelete={() =>
                              handleDeletePenalty(member.id, index)
                            }
                          />
                        </td>
                      </S.ExpandedRow>
                    ))}

                    {isAdding && editingIndex === null && (
                      <S.ExpandedRow>
                        <td colSpan={columns.length + 2}>
                          <PenaltyAdd
                            userId={member.id}
                            onCancel={handleCancelAdd}
                            onSave={(data) =>
                              handleSavePenalty(member.id, data)
                            }
                            existingData={
                              editingIndex !== null && penaltyData[member.id]
                                ? penaltyData[member.id][editingIndex]
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
