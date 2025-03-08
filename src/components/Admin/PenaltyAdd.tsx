import theme from '@/styles/theme';
import { styled } from 'styled-components';
import { Wrapper } from '@/styles/admin/DuesRegisterDropDown.styled';
import Button from '@/components/Admin/Button';
import * as S from '@/styles/admin/DuesRegisterDropDown.styled';

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
  width: 43%;
  min-width: 480px;
  min-height: 420px;
  margin-top: 30px;
  border-top: 0px;
  padding: 0px;
`;

export const InputWrapper = styled.div`
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
    outline: 1px solid ${theme.color.gray[18]};
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
  return (
    <PenaltyWrapper>
      <TitleWrapper>
        <Title>패널티 추가</Title>
      </TitleWrapper>
      <Line />
      <ItemWrapper>
        <InputWrapper>
          <SubTitle>이름</SubTitle>
          <Input placeholder="이름" />
        </InputWrapper>
        <InputWrapper>
          <SubTitle>패널티 사유</SubTitle>
          <Input placeholder="ex) 미션 과제 미제출" />
        </InputWrapper>
        <S.ButtonWrapper>
          <Button
            description="초기화"
            color="#323232"
            width="75px"
            borderRadius="4px"
          />
          <Button
            description="추가"
            color="#ff5858"
            width="62px"
            borderRadius="4px"
            // onClick={handleRegister}
          />
        </S.ButtonWrapper>
      </ItemWrapper>
    </PenaltyWrapper>
  );
};

export default PenaltyAdd;
