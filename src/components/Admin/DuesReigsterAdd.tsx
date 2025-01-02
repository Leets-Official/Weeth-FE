import {
  Wrapper,
  Title,
  SubTitle,
  CardinalWrapper,
  CardinalButtonWrapper,
  DuesInputWrapper,
  DescriptionWrapper,
  FileWrapper,
  ButtonWrapper,
  InputWrapper,
} from '@/styles/admin/DuesReigsterAdd.styled';
import { useState } from 'react';
import Cardinal from './Cardinal';
import DuesInput from './DuesInput';
import Button from './Button';

const DuesReigsterAdd: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState('기수');

  return (
    <Wrapper>
      <Title>회비 사용 내역 추가</Title>
      <SubTitle>기수</SubTitle>
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
      <SubTitle>일자</SubTitle>
      <DescriptionWrapper>
        <DuesInput width="91%" placeholder="- 없이 숫자만 입력" />
      </DescriptionWrapper>
      <SubTitle>사용 내용</SubTitle>
      <DescriptionWrapper>
        <DuesInput width="91%" placeholder="ex)강의 구매" />
      </DescriptionWrapper>
      <SubTitle>사용 금액</SubTitle>
      <DescriptionWrapper>
        <DuesInput width="91%" placeholder="사용 금액 입력" />
      </DescriptionWrapper>
      <SubTitle>사용처</SubTitle>
      <DescriptionWrapper>
        <DuesInput width="91%" placeholder="ex)인프런" />
      </DescriptionWrapper>
      <SubTitle>영수증 첨부</SubTitle>
      <DescriptionWrapper>
        <FileWrapper>
          <ButtonWrapper>
            <Button description="파일 선택" color="#00dda8" width="99px" />
          </ButtonWrapper>
          <InputWrapper>
            <DuesInput width="90%" placeholder="선택된 파일 없음" />
          </InputWrapper>
        </FileWrapper>
      </DescriptionWrapper>
    </Wrapper>
  );
};

export default DuesReigsterAdd;
