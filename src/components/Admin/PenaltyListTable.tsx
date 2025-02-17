import React, { useEffect, useReducer, useState } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import plusIcon from '@/assets/images/ic_admin_plus.svg';
import {
  penaltyReducer,
  PenaltyState,
  Penalty,
} from '@/components/Admin/context/PenaltyReducer';
import { getPenaltyApi } from '@/api/admin/penalty/getPenalty';
import {
  // MemberData,
  useMemberContext,
} from '@/components/Admin/context/MemberContext';
import PenaltyDetail from '@/components/Admin/PenaltyDetail';
import PenaltyAdd from '@/components/Admin/PenaltyAdd';
import { statusColors } from '@/components/Admin/StatusIndicator';
import { StatusCell } from '@/components/Admin/MemberListTableRow';
import { EmptyCell } from '@/components/Admin/MemberListTableHeader';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const columns = [
  { key: 'name', header: '이름' },
  { key: 'position', header: '역할' },
  { key: 'department', header: '학과' },
  { key: 'studentId', header: '학번' },
  { key: 'penaltyCount', header: '패널티' },
  { key: 'LatestPenalty', header: '최근 패널티' },
  { key: 'empty', header: '' },
];

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

// interface PenaltyListTableProps {
//   members: MemberData[];
// }

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
    if (!time) return '날짜 없음';

    return dayjs(time).tz('Asia/Seoul').format('YYYY.MM.DD');
  };

  const getLatestPenaltyDate = (penalties: { time: string }[] | undefined) => {
    if (!penalties || penalties.length === 0) return '없음';

    return penalties
      .map((penalty) => dayjs(penalty.time).tz('Asia/Seoul'))
      .sort((a, b) => b.valueOf() - a.valueOf())[0]
      .format('YYYY.MM.DD');
  };

  const fetchPenaltyData = async () => {
    try {
      const response = await getPenaltyApi();
      console.log('페널티 조회 API 응답: ', response);

      if (response.code === 200) {
        const penalties = response.data.reduce(
          (
            acc: { [x: string]: any },
            item: { userId: string | number; Penalties: any[] },
          ) => {
            acc[item.userId] = item.Penalties.map((penalty: any) => ({
              penaltyId: penalty.penaltyId,
              penaltyDescription: penalty.penaltyDescription,
              time: formatDate(penalty.time),
            }));
            return acc;
          },
          {} as PenaltyState,
        );

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
      await fetchPenaltyData();
    }
  };

  const handleAddPenalty = (userId: number) => {
    setIsAdding(true);
    setExpandedRow(userId);
    setEditingIndex(null);
  };

  const handleEditPenalty = (userId: number, index: number) => {
    setIsAdding(true);
    setExpandedRow(userId);

    setEditingIndex((prev) => {
      console.log(' 이전 editingIndex:', prev);
      return index;
    });
  };

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
    columns.map((column) => {
      if (column.key === 'empty') {
        return <S.EmptyCell key={column.key} />;
      }

      if (column.key === 'LatestPenalty') {
        return (
          <S.Cell key={column.key}>
            {getLatestPenaltyDate(penaltyData[member.id])}
          </S.Cell>
        );
      }

      return <S.Cell key={column.key}>{member[column.key]}</S.Cell>;
    });

  useEffect(() => {
    fetchPenaltyData();
  }, []);

  return (
    <S.TableContainer>
      <S.TableWrapper>
        <table>
          <thead>
            <tr>
              <EmptyCell aria-label="Status Indicator" />
              <EmptyCell aria-label="Plus Button" />
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
                              handleSavePenalty(member.id, {
                                ...data,
                                penaltyId: data.penaltyId ?? 0,
                              })
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
