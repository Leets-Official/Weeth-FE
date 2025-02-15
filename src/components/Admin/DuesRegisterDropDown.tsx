import {
  Wrapper,
  Title,
  CardinalWrapper,
  DuesInputWrapper,
  DescriptionWrapper,
  ButtonWrapperWithDescription,
  Description,
  ButtonWrapper,
} from '@/styles/admin/DuesRegisterDropDown.styled';
import { useState } from 'react';
import { registerDues } from '@/api/admin/dues/postRegisterDues';
import DuesInput from './DuesInput';
import Button from './Button';
import CardinalDropdown from './Cardinal';

const DuesRegisterDropDown: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<null | number>(null);
  const [customCardinal, setCustomCardinal] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleRegister = async () => {
    const cardinal = selectedCardinal ?? Number(customCardinal);
    const totalAmount = Number(amount);

    try {
      await registerDues({ cardinal, description, totalAmount });

      setSelectedCardinal(null);
      setCustomCardinal('');
      setDescription('');
      setAmount('');
    } catch (error) {
      console.error('회비 등록 실패:', error);
    }
  };

  return (
    <Wrapper>
      <Title>기수</Title>
      <CardinalWrapper>
        <div>
          <CardinalDropdown
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={setSelectedCardinal}
          />
        </div>
        <DuesInputWrapper>
          <DuesInput
            width="95%"
            placeholder="직접 입력"
            value={customCardinal}
            onChange={(e) => setCustomCardinal(e.target.value)}
          />
        </DuesInputWrapper>
      </CardinalWrapper>
      <DescriptionWrapper>
        <Title>회비 설명</Title>
        <DuesInput
          width="96%"
          placeholder="ex. 4기 회비 (3월 이월금 + 4기 회비)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DescriptionWrapper>
      <DescriptionWrapper>
        <Title>사용 금액</Title>
        <DuesInput
          width="96%"
          placeholder="사용 금액 입력"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DescriptionWrapper>
      <ButtonWrapperWithDescription>
        <Description>*회비 등록은 기수당 한 번만 가능합니다.</Description>
        <ButtonWrapper>
          <Button description="Cancel" color="#323232" width="89px" />
          <Button
            description="추가"
            color="#ff5858"
            width="64px"
            onClick={handleRegister}
          />
        </ButtonWrapper>
      </ButtonWrapperWithDescription>
    </Wrapper>
  );
};

export default DuesRegisterDropDown;
