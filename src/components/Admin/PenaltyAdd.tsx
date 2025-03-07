import theme from '@/styles/theme';
import { styled } from 'styled-components';
import { Title } from '@/components/Admin/DuesRegister';
import { Wrapper } from '@/styles/admin/DuesRegisterDropDown.styled';

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
  min-height: 370px;
  margin-top: 30px;
  border-top: 0px;
`;

export const Line = styled.div`
  border: 1px solid #dedede;
`;
const PenaltyAdd: React.FC = () => {
  return (
    <PenaltyWrapper>
      <Title>패널티 추가</Title>
      <Line />
      <SubTitle>이름</SubTitle>
      <SubTitle>패널티 사유</SubTitle>
    </PenaltyWrapper>
  );
};

export default PenaltyAdd;
