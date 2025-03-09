import Button from '@/components/Admin/Button';
import * as S from '@/styles/admin/penalty/PenaltyAdd.styled';
import { ButtonWrapper } from '@/styles/admin/DuesRegisterDropDown.styled';
import { useState } from 'react';
import { useMemberContext } from '@/components/Admin/context/MemberContext';
import PenaltyMemberDropdown from '@/components/Admin/PenaltyMemberDropdown';
import { postPenaltyApi } from '@/api/admin/penalty/getPenalty';

const PenaltyAdd: React.FC = () => {
  const { members } = useMemberContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [penaltyDescription, setPenaltyDescription] = useState<string>('');

  const filteredMembers = members.filter((member) =>
    member.name.includes(searchTerm),
  );

  const handleSelectMember = (name: string) => {
    setSelectedMember(name);
    setSearchTerm(name);
    setIsDropdownOpen(false);
  };

  const handleReset = () => {
    setSelectedMember('');
    setSearchTerm('');
    setPenaltyDescription('');
  };

  const handleAddPenalty = async () => {
    if (!selectedMember || !penaltyDescription.trim()) {
      alert('멤버와 패널티 사유를 입력해주세요.');
    }

    const member = members.find((m) => m.name === selectedMember);
    if (!member) {
      alert('선택한 멤버를 찾을 수 없습니다.');
      return;
    }

    const requestData = {
      userId: member.id,
      penaltyDescription,
    };

    try {
      const res = await postPenaltyApi(
        requestData.userId,
        requestData.penaltyDescription,
      );
      if (res.code === 200) {
        alert('패널티가 성공적으로 부여되었습니다.');
        handleReset();
      } else {
        alert(`패널티 부여 실패: ${res.message}`);
      }
    } catch (error) {
      console.error('패널티 부여 오류: ', error);
      alert(' 패널티 부여 실패');
    }
  };
  return (
    <S.PenaltyWrapper>
      <S.TitleWrapper>
        <S.Title>패널티 추가</S.Title>
      </S.TitleWrapper>
      <S.Line />
      <S.ItemWrapper>
        <S.InputWrapper>
          <S.SubTitle>이름</S.SubTitle>
          <S.Input
            placeholder="이름"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setIsDropdownOpen(false)}
          />
          {isDropdownOpen && (
            <PenaltyMemberDropdown
              members={filteredMembers}
              onSelect={handleSelectMember}
            />
          )}
        </S.InputWrapper>
        <S.InputWrapper>
          <S.SubTitle>패널티 사유</S.SubTitle>
          <S.Input
            placeholder="ex) 미션 과제 미제출"
            value={penaltyDescription}
            onChange={(e) => setPenaltyDescription(e.target.value)}
          />
        </S.InputWrapper>
        <ButtonWrapper>
          <Button
            description="초기화"
            color="#323232"
            width="75px"
            borderRadius="4px"
            onClick={handleReset}
          />
          <Button
            description="추가"
            color="#ff5858"
            width="62px"
            borderRadius="4px"
            onClick={handleAddPenalty}
          />
        </ButtonWrapper>
      </S.ItemWrapper>
    </S.PenaltyWrapper>
  );
};

export default PenaltyAdd;
