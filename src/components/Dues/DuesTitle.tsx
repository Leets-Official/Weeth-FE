import useGetDuesInfo from '@/api/useDuesInfo';
import useGetUserInfo from '@/api/useGetUserInfo';
import receipt from '@/assets/images/ic_receipt.svg';
import formatDateTime from '@/hooks/formatDateTime';
import theme from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DuesBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 92%;
  margin: 21px 4% 0 4%;
  font-family: ${theme.font.semiBold};
`;

const DuesTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 21px;
  font-size: 18px;
`;

const UpdateText = styled.div`
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[65]};
  font-size: 14px;
  margin-top: 14px;
`;

const BasicCaption = styled.button`
  width: 56px;
  height: 34px;
  background-color: ${theme.color.gray[30]};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ImgCaptionProps {
  navi: (path: string) => void;
}

const ImgCaption: React.FC<ImgCaptionProps> = ({ navi }) => (
  <BasicCaption onClick={() => navi('/receipt')}>
    <img src={receipt} alt="영수증" />
  </BasicCaption>
);

const DuesTitle: React.FC = () => {
  const navi = useNavigate();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  let semester: string;
  let displayYear = currentYear;

  if (currentMonth >= 3 && currentMonth <= 8) {
    semester = '1학기';
  } else {
    semester = '2학기';
    if (currentMonth >= 1 && currentMonth <= 2) {
      displayYear = currentYear - 1;
    }
  }

  const { userInfo } = useGetUserInfo();
  const cardinal = userInfo?.cardinals?.[userInfo.cardinals.length - 1] ?? 0;
  const { duesInfo } = useGetDuesInfo(cardinal);

  const formattedTime = duesInfo ? formatDateTime(duesInfo.time) : 'N/A';

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
