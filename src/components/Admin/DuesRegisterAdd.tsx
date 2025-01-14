import {
  Wrapper,
  Title,
  SubTitle,
  CardinalWrapper,
  DuesInputWrapper,
  DescriptionWrapper,
  FileWrapper,
  ButtonWrapper,
  InputWrapper,
} from '@/styles/admin/DuesRegisterAdd.styled';
import { useState } from 'react';
import Cardinal from './Cardinal';
import DuesInput from './DuesInput';
import Button from './Button';

const DuesRegisterAdd: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState('기수');

  const inputFields = [
    {
      id: 'date',
      title: '일자',
      placeholder: '- 없이 숫자만 입력',
      width: '91%',
    },
    {
      id: 'content',
      title: '사용 내용',
      placeholder: 'ex)강의 구매',
      width: '91%',
    },
    {
      id: 'amount',
      title: '사용 금액',
      placeholder: '사용 금액 입력',
      width: '91%',
    },
    { id: 'location', title: '사용처', placeholder: 'ex)인프런', width: '91%' },
  ];

  return (
    <Wrapper>
      <Title>회비 사용 내역 추가</Title>
      <SubTitle>기수</SubTitle>
      <CardinalWrapper>
        <div>
          <Cardinal
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={setSelectedCardinal}
          />
        </div>
        <DuesInputWrapper>
          <DuesInput width="95%" placeholder="직접 입력" />
        </DuesInputWrapper>
      </CardinalWrapper>
      {inputFields.map((field) => (
        <div key={field.id}>
          <SubTitle>{field.title}</SubTitle>
          <DescriptionWrapper>
            <DuesInput width={field.width} placeholder={field.placeholder} />
          </DescriptionWrapper>
        </div>
      ))}
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

export default DuesRegisterAdd;
