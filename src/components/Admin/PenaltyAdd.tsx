import theme from '@/styles/theme';
import { styled } from 'styled-components';
import { Wrapper } from '@/styles/admin/DuesRegisterDropDown.styled';
import Button from '@/components/Admin/Button';
import * as S from '@/styles/admin/DuesRegisterDropDown.styled';
import { useState } from 'react';
import { useMemberContext } from '@/components/Admin/context/MemberContext';
import PenaltyMemberDropdown from '@/components/Admin/PenaltyMemberDropdown';
import { postPenaltyApi } from '@/api/admin/penalty/getPenalty';

export const TitleWrapper = styled.div`
  padding: 25px 30px;
`;
export const SubTitle = styled.div`
  font-family: ${theme.font.regular};
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const PenaltyWrapper = styled(Wrapper)`
  border-radius: 4px;
  width: 490px;
  min-width: 490px;
  min-height: 420px;
  margin-top: 30px;
  border-top: 0px;
  padding: 0px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;
export const Input = styled.input`
  width: 100%;
  font-size: 18px;
  font-family: ${theme.font.regular};
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 12px 16px;
  box-sizing: border-box;
  &:focus {
    outline: 1.5px solid ${theme.color.gray[18]};
  }
`;

export const Title = styled.div`
  font-size: 20px;
`;

export const Line = styled.div`
  border: 1px solid #dedede;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  padding: 30px;
`;

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
    <PenaltyWrapper>
      <TitleWrapper>
        <Title>패널티 추가</Title>
      </TitleWrapper>
      <Line />
      <ItemWrapper>
        <InputWrapper>
          <SubTitle>이름</SubTitle>
          <Input
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
        </InputWrapper>
        <InputWrapper>
          <SubTitle>패널티 사유</SubTitle>
          <Input
            placeholder="ex) 미션 과제 미제출"
            value={penaltyDescription}
            onChange={(e) => setPenaltyDescription(e.target.value)}
          />
        </InputWrapper>
        <S.ButtonWrapper>
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
        </S.ButtonWrapper>
      </ItemWrapper>
    </PenaltyWrapper>
  );
};

export default PenaltyAdd;
