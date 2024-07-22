import styled from 'styled-components';
import PropTypes from 'prop-types';
import Caption from '../Caption';
import theme from '../../styles/theme';

const MemberWrapper = styled.div`
  width; 100%;
  padding: 20px 10px 0px 10px;
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

const DuesInfo = ({ dues, cardinal, date, memo }) => {
  return (
    <MemberWrapper>
      <StyledDuesBox>
        <StyledCaptionBox>
          {cardinal === 1 ? (
            <Caption color={theme.color.main.positive}>수입</Caption>
          ) : (
            <Caption color={theme.color.main.negative}>지출</Caption>
          )}
          <StyledTextBox>
            <Text>이월금액</Text>
            <SmallText>{date}</SmallText>
          </StyledTextBox>
        </StyledCaptionBox>
        <StyledMemoBox>
          <Text>{dues}원</Text> {/* 원 단위를 추가 */}
          <SmallText>{memo}</SmallText>
        </StyledMemoBox>
      </StyledDuesBox>
    </MemberWrapper>
  );
};

DuesInfo.propTypes = {
  dues: PropTypes.string.isRequired,
  cardinal: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  memo: PropTypes.string.isRequired,
};

export default DuesInfo;
