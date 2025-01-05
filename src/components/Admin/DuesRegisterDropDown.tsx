import {
  Wrapper,
  Title,
  CardinalWrapper,
  CardinalButtonWrapper,
  DuesInputWrapper,
  DescriptionWrapper,
  ButtonWrapperWithDescription,
  Description,
  ButtonWrapper,
} from '@/styles/admin/DuesRegisterDropDown.styled';
import { useState } from 'react';
import Cardinal from './Cardinal';
import DuesInput from './DuesInput';
import Button from './Button';

const DuesRegisterDropDown: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState('기수');
  return (
    <Wrapper>
      <Title>기수</Title>
      <CardinalWrapper>
        <CardinalButtonWrapper>
          <Cardinal
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={setSelectedCardinal}
          />
        </CardinalButtonWrapper>
        <DuesInputWrapper>
          <DuesInput width="95%" placeholder="직접 입력" />
        </DuesInputWrapper>
      </CardinalWrapper>
      <DescriptionWrapper>
        <Title>회비 설명</Title>
        <DuesInput
          width="96%"
          placeholder="ex. 4기 회비 (3월 이월금 + 4기 회비)"
        />
      </DescriptionWrapper>
      <DescriptionWrapper>
        <Title>사용 금액</Title>
        <DuesInput width="96%" placeholder="사용 금액 입력" />
      </DescriptionWrapper>
      <ButtonWrapperWithDescription>
        <Description>*회비 등록은 기수당 한 번만 가능합니다.</Description>
        <ButtonWrapper>
          <Button description="Cancel" color="#323232" width="89px" />
          <Button description="추가" color="#ff5858" width="64px" />
        </ButtonWrapper>
      </ButtonWrapperWithDescription>
    </Wrapper>
  );
};

export default DuesRegisterDropDown;
