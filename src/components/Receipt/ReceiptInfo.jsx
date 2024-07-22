import styled from 'styled-components';
import PropTypes from 'prop-types';
import Caption from '../Caption';
import theme from '../../styles/theme';

const MemberWrapper = styled.div`
  width; 100%;
  padding: 20px 10px 0px 10px;
  font-family: ${theme.font.family.pretendard_regular};
`;

const StyledReceiptBox = styled.div`
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
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;

const ReceiptInfo = ({ money, date, memo }) => {
  return (
    <MemberWrapper>
      <StyledReceiptBox>
        <StyledCaptionBox>
          <Caption color={theme.color.main.negative}>지출</Caption>
          <StyledTextBox>
            <Text>이월금액</Text>
            <SmallText>{date}</SmallText>
          </StyledTextBox>
        </StyledCaptionBox>
        <StyledMemoBox>
          <Text>{money}원</Text>
          <SmallText>{memo}</SmallText>
        </StyledMemoBox>
      </StyledReceiptBox>
    </MemberWrapper>
  );
};

ReceiptInfo.propTypes = {
  money: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  memo: PropTypes.string.isRequired,
};

export default ReceiptInfo;
