import styled from 'styled-components';
import theme from '@/styles/theme';
import { useState } from 'react';
import Cardinal from './Cardinal';
import DuesInput from './DuesInput';
import Button from './Button';

const Wrapper = styled.div`
  width: 90%;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-family: ${theme.font.regular};
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const CardinalWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const CarinalButtonWrapper = styled.div`
  flex;3
`;

const DuesInputWrapper = styled.div`
  flex: 7;
`;

const DescriptionWrapper = styled.div`
  margin-top: 30px;
`;

const Description = styled.div`
  color: red;
  font-family: ${theme.font.regular};
  font-size: 18px;
  margin-left: 100px;
  margin-top: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const ButtonWrapperWithDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
`;

const DuesReigsterDropDown: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState('기수');
  return (
    <Wrapper>
      <Title>기수</Title>
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

export default DuesReigsterDropDown;
