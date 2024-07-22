import styled from 'styled-components';
import theme from '../../styles/theme';
import ReceiptInfo from './ReceiptInfo';

const StyledReceipt = styled.div`
  width: 370px;
  height: height: calc(var(--vh, 1vh) * 100);
  font-family: ${theme.font.family.pretendard_regular};
`;
const Line = styled.div`
  border: 1px solid;
  color: #4d4d4d;
  width: 88%;
  margin: 15px 6% 0 6%;
  transform: scaleY(0.2);
`;
const StyledMonth = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 18px;
  margin: 15px 0 0 6%;
`;

const ReceiptMain = () => {
  return (
    <StyledReceipt>
      <StyledMonth>1월</StyledMonth>
      <Line />
      <StyledMonth>2월</StyledMonth>
      <Line />
      <StyledMonth>3월</StyledMonth>
      <ReceiptInfo money="234,234원" date="2024. 03." memo="20,000 * 12명" />
      <Line />
    </StyledReceipt>
  );
};

export default ReceiptMain;
