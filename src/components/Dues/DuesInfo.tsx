import styled from 'styled-components';
import Caption from '@/components/Caption';
import theme from '@/styles/theme';

interface DuseInfoProps {
  dues: number;
  category: string;
  date: string;
  memo: string;
}

const MemberWrapper = styled.div`
  width; 100%;
  padding: 20px 0px 0px 0px;
  font-family: ${theme.font.family.pretendard_regular};
`;

const StyledDuesBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledCaptionBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: -2px;
`;

const StyledMemoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 10px;
`;

const Text = styled.div`
  font-size: 16px;
`;

const SmallText = styled.div`
  margin-top: 7px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

const DuesInfo: React.FC<DuseInfoProps> = ({ dues, category, date, memo }) => {
  return (
    <MemberWrapper>
      <StyledDuesBox>
        <StyledCaptionBox>
          {category === '회비' ? (
            <Caption color={theme.color.main.positive}>회비</Caption>
          ) : (
            <Caption color={theme.color.main.negative}>지출</Caption>
          )}
          <StyledTextBox>
            <Text>금액</Text>
            <SmallText>{date}</SmallText>
          </StyledTextBox>
        </StyledCaptionBox>
        <StyledMemoBox>
          <Text>{dues.toLocaleString()}원</Text>
          <SmallText>{memo}</SmallText>
        </StyledMemoBox>
      </StyledDuesBox>
    </MemberWrapper>
  );
};

export default DuesInfo;
