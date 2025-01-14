import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { MemberData } from './context/MemberContext';

const DetailRow = styled.tr`
  background-color: #ffffff;
`;

const DetailCell = styled.td`
  padding: 10px;
  text-align: left;
  white-space: nowrap;
`;

interface PenaltyDetailProps {
  member: MemberData;
}

const PenaltyDetail: React.FC<PenaltyDetailProps> = ({ member }) => {
  // const handleEdit = () => {
  //   console.log('Edit penalty for:', member.studentId);
  // };

  // const handleDelete = () => {
  //   if (window.confirm('삭제하시겠습니까?')) {
  //     console.log('Deleted penalty for:', member.studentId);
  //   }
  // };

  return (
    <DetailRow>
      <DetailCell>미션 과제 미제출</DetailCell>
      <DetailCell>1</DetailCell>
      <DetailCell>2025.07.27</DetailCell>
      <DetailCell>
        <Button
          color="#2f2f2f"
          description="수정"
          width="64px"
          //   onClick={handleEdit}
        />
        <Button
          color="#ff5858"
          description="삭제"
          width="64px"
          //   onClick={handleDelete}
        />
      </DetailCell>
    </DetailRow>
  );
};

export default PenaltyDetail;
