import styled from 'styled-components';
import theme from '@/styles/theme';
import { useState } from 'react';
import Cardinal from './Cardinal';
import DuesInput from './DuesInput';
import Button from './Button';

const Wrapper = styled.div`
  width: 90%;
  margin-top: 50px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding-bottom: 30px;
  margin-bottom: 30px;
`;

const Title = styled.div`
  width: 100%;
  height: 72px;
  padding: 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-family: ${theme.font.regular};
`;

const SubTitle = styled.div`
  font-family: ${theme.font.regular};
  font-size: 16px;
  padding: 20px 30px;
`;

const CardinalWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 0 30px;
  box-sizing: border-box;
`;

const CarinalButtonWrapper = styled.div`
  flex;3
`;

const DuesInputWrapper = styled.div`
  flex: 7;
`;

const DescriptionWrapper = styled.div`
  margin-left: 30px;
`;

const FileWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
`;
const ButtonWrapper = styled.div`
  flex;3
`;

const InputWrapper = styled.div`
  flex: 7;
`;

const DuesReigsterAdd: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState('기수');

  return (
    <Wrapper>
      <Title>회비 사용 내역 추가</Title>
      <SubTitle>기수</SubTitle>
      <CardinalWrapper>
        <CarinalButtonWrapper>
          <Cardinal
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={setSelectedCardinal}
          />
        </CarinalButtonWrapper>
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
