import React, { useEffect, useReducer, useState } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import {
  penaltyReducer,
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
import { NoDataCell } from '@/components/Admin/MemberListTable';
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
}

const PenaltyListTable: React.FC<PenaltyListTableProps> = ({
  selectedCardinal,
}) => {
  const { members } = useMemberContext();
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const { isAdmin, loading } = useGetUserInfo();
  const [penaltyData, dispatch] = useReducer(
    penaltyReducer,
    {} as PenaltyState,
  );

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

  useEffect(() => {
    const penalizedMembers = Object.keys(penaltyData)
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

    const filteredByCardinal = selectedCardinal
      ? penalizedMembers.filter((member) => {
          if (!member) return false;

          let cardinalNumbers: number[] = [];

          if (typeof member.cardinals === 'string') {
            cardinalNumbers = (member.cardinals as string)
              .split('.')
              .map(Number);
          } else if (Array.isArray(member.cardinals)) {
            cardinalNumbers = member.cardinals;
          }

          return cardinalNumbers.includes(selectedCardinal);
        })
      : penalizedMembers;

    setFilteredMembers(filteredByCardinal);
  }, [penaltyData, members, selectedCardinal, isAdmin, loading]);

  const handleRowClick = (userId: number) => {
    setExpandedRow((prev) => (prev === userId ? null : userId));
  };

  const handleEditPenalty = (userId: number) => {
    setExpandedRow(userId);
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
  }, [isAdmin, loading]);

  return (
    <S.TableContainer>
      <S.TableWrapper>
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
                <td colSpan={columns.length + 2}>
                  <NoDataCell>검색된 멤버가 없습니다.</NoDataCell>
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
                              onEdit={() => handleEditPenalty(member.id)}
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
