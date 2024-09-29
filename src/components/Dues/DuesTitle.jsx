import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import receipt from '../../assets/images/ic_receipt.svg';
import theme from '../../styles/theme';
import { DuesContext } from '../../service/DuesContext';

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

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 0부터 시작하므로 +1

  let semester;
  let displayYear = currentYear;

  if (currentMonth >= 3 && currentMonth <= 8) {
    semester = '1학기';
  } else {
    semester = '2학기';
    // 2학기 일 때 9월부터 12월까지는 현재 연도, 1월과 2월은 전년도 학기로 표기
    if (currentMonth >= 1 && currentMonth <= 2) {
      displayYear = currentYear - 1;
    }
  }
  const { time } = useContext(DuesContext);
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    if (!timeString) {
      return '-';
    }
    // 날짜
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // 시간
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // 피그마 형식대로 설정
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  const formattedTime = formatTime(time);

  return (
    <DuesBox>
      <DuesTextBox>
        <div>
          {displayYear}학년 {semester}
        </div>
        <UpdateText>최근 업데이트: {formattedTime}</UpdateText>
      </DuesTextBox>
      <ImgCaption navi={navi} />
    </DuesBox>
  );
};

export default DuesTitle;
