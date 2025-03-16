import React, { useEffect, useState } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import {
  PenaltyAction,
  PenaltyState,
} from '@/components/Admin/context/PenaltyReducer';
import { getPenaltyApi } from '@/api/admin/penalty/getPenalty';
import {
  MemberData,
  useMemberContext,
} from '@/components/Admin/context/MemberContext';
import PenaltyDetail from '@/components/Admin/PenaltyDetail';
import { statusColors } from '@/components/Admin/StatusIndicator';
import { StatusCell } from '@/components/Admin/MemberListTableRow';
import formatDate from '@/utils/admin/dateUtils';
import dayjs from 'dayjs';
import useGetUserInfo from '@/api/useGetGlobaluserInfo';
import PenaltySubHeaderRow from '@/components/Admin/PenaltySubHeaderRow';

const columns = [
  { key: 'name', header: '이름' },
  { key: 'position', header: '역할' },
  { key: 'department', header: '학과' },
  { key: 'studentId', header: '학번' },
  { key: 'penaltyCount', header: '패널티' },
  { key: 'LatestPenalty', header: '최근 패널티' },
  { key: 'empty', header: '' },
];

interface PenaltyListTableProps {
  selectedCardinal: number | null;
  searchName: string;
  penaltyData: PenaltyState;
  dispatch: React.Dispatch<PenaltyAction>;
}

const PenaltyListTable: React.FC<PenaltyListTableProps> = ({
  selectedCardinal,
  searchName,
  penaltyData,
  dispatch,
}) => {
  const { members } = useMemberContext();
  const [filteredMembers, setFilteredMembers] = useState<MemberData[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const { isAdmin, loading } = useGetUserInfo();

  const getLatestPenaltyDate = (penalties: { time: string }[] | undefined) => {
    if (!penalties || penalties.length === 0) return '없음';

    return penalties
      .map((penalty) => dayjs(penalty.time).tz('Asia/Seoul'))
      .sort((a, b) => b.valueOf() - a.valueOf())[0]
      .format('YYYY.MM.DD');
  };

  const fetchPenaltyData = async () => {
    try {
      if (loading || isAdmin === undefined || !isAdmin) return;

      const response = await getPenaltyApi();

      if (response.code === 200) {
        console.log('패널티 조회 결과:', response.data);
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

  useEffect(() => {
    fetchPenaltyData();
  }, [isAdmin, loading]);

  useEffect(() => {
    if (!penaltyData || !members.length) return;

    let penalizedMembers = Object.keys(penaltyData)
      .map((userId) => {
        const numericUserId = Number(userId);

        const matchedMember = members.find(
          (member) => member.id === numericUserId,
        );

        if (!matchedMember) return null;

        return {
          ...matchedMember,
          penaltyCount: penaltyData[numericUserId].length,
          LatestPenalty: getLatestPenaltyDate(penaltyData[numericUserId]),
        };
      })
      .filter(Boolean) as MemberData[];

    if (selectedCardinal) {
      penalizedMembers = penalizedMembers.filter((member) => {
        let cardinalNumbers: number[] = [];
        if (typeof member.cardinals === 'string') {
          cardinalNumbers = (member.cardinals as string).split('.').map(Number);
        } else if (Array.isArray(member.cardinals)) {
          cardinalNumbers = member.cardinals;
        }
        return cardinalNumbers.includes(selectedCardinal);
      });
    }

    if (searchName.trim()) {
      penalizedMembers = penalizedMembers.filter((member) =>
        member.name.toLowerCase().includes(searchName.toLowerCase()),
      );
    }

    setFilteredMembers(penalizedMembers);
  }, [penaltyData, members, selectedCardinal, searchName, isAdmin, loading]);

  const handleRowClick = (userId: number) => {
    setExpandedRow((prev) => (prev === userId ? null : userId));
  };

  const handleEditPenalty = (
    userId: number,
    index: number,
    updatedDescription: string,
  ) => {
    dispatch({
      type: 'EDIT_PENALTY',
      userId,
      index,
      payload: {
        ...penaltyData[userId][index],
        penaltyDescription: updatedDescription,
      },
    });
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

  return (
    <S.TableContainer>
      <S.TableWrapper hasData={filteredMembers.length > 0}>
        <table>
          <thead>
            <tr>
              <StatusCell statusColor={statusColors['승인 완료']} />
              {columns.map((column) => (
                <S.HeaderCell key={column.key}>{column.header}</S.HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <S.NoDataCell>검색된 멤버가 없습니다.</S.NoDataCell>
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <React.Fragment key={member.id}>
                  <S.Row
                    isSelected={expandedRow === member.id}
                    onClick={() => handleRowClick(member.id)}
                  >
                    <StatusCell statusColor={statusColors[member.status]} />
                    {renderColumns(member)}
                  </S.Row>

                  {expandedRow === member.id && (
                    <>
                      <PenaltySubHeaderRow />

                      {penaltyData[member.id]?.map((penalty, index) => (
                        <tr key={`${member.id}-${penalty.penaltyId}`}>
                          <td colSpan={columns.length + 2}>
                            <PenaltyDetail
                              penaltyData={{
                                penaltyId: penalty.penaltyId,
                                penaltyDescription: penalty.penaltyDescription,
                                time: formatDate(penalty.time),
                              }}
                              onEdit={(penaltyId, updatedDescription) =>
                                handleEditPenalty(
                                  member.id,
                                  index,
                                  updatedDescription,
                                )
                              }
                              onDelete={() =>
                                handleDeletePenalty(member.id, index)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>

          {filteredMembers.length > 0 && (
            <>
              <StatusCell statusColor={statusColors['승인 완료']} />
              {columns.map((column) => (
                <S.HeaderCell key={column.key}>{column.header}</S.HeaderCell>
              ))}
            </>
          )}
        </table>
      </S.TableWrapper>
    </S.TableContainer>
  );
};

export default PenaltyListTable;
