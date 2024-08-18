import styled from 'styled-components';
import PropTypes from 'prop-types';
import Caption from '../Caption';
import theme from '../../styles/theme';

const MemberWrapper = styled.div`
  width; 88%;
  margin: 16px 6% 0 6%;
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
  margin-top: 7px;
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
            <Text>{memo}</Text>
            <SmallText>{date}</SmallText>
          </StyledTextBox>
        </StyledCaptionBox>
        <StyledMemoBox>
          <Text>{money}원</Text>
          <SmallText>&nbsp;</SmallText>
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
