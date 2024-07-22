import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import receipt from '../../assets/images/ic_receipt.svg';
import theme from '../../styles/theme';

const DuesBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 92%;
  margin: 21px 4% 0 4%;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const DuesTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 21px;
  font-size: 18px;
`;

const UpdateText = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  color: ${theme.color.grayScale.gray65};
  font-size: 14px;
  margin-top: 14px;
`;

const BasicCaption = styled.button`
  width: 56px;
  height: 34px;
  background-color: ${theme.color.grayScale.gray30};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgCaption = ({ navi }) => (
  <BasicCaption onClick={() => navi('/receipt')}>
    <img src={receipt} alt="영수증" />
  </BasicCaption>
);

ImgCaption.propTypes = {
  navi: PropTypes.func.isRequired,
};

const DuesTitle = () => {
  const navi = useNavigate();

  return (
    <DuesBox>
      <DuesTextBox>
        <div>2024학년 1학기</div>
        <UpdateText>최근 업데이트: 2024/06/10 18:32</UpdateText>
      </DuesTextBox>
      <ImgCaption navi={navi} />
    </DuesBox>
  );
};

export default DuesTitle;
