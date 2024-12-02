import { UserContext } from '@/api/UserContext';
import icCardinal from '@/assets/images/ic_cardinal.svg';
import icDepartment from '@/assets/images/ic_department.svg';
import icEmail from '@/assets/images/ic_mail.svg';
import icName from '@/assets/images/ic_name.svg';
import icPhone from '@/assets/images/ic_phone.svg';
import icPosition from '@/assets/images/ic_position.svg';
import icStudentId from '@/assets/images/ic_studentID.svg';
import InfoComponent from '@/components/Member/InfoComponent';
import theme from '@/styles/theme';
import { useContext } from 'react';
import styled from 'styled-components';

const InfoWrapper = styled.div`
  padding-top: 20px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-family: ${theme.font.semiBold};
`;

const MyInfo = () => {
  const { userData, error } = useContext(UserContext);

  if (!userData && !error) {
    return null;
  }

  const myInfo = [
    {
      src: icName,
      alt: '이름',
      index: '이름',
      value: userData.name,
    },
    {
      src: icStudentId,
      alt: '학번',
      index: '학번',
      value: userData.studentId,
    },
    {
      src: icDepartment,
      alt: '학과',
      index: '학과',
      value: userData.department,
    },
    {
      src: icPhone,
      alt: '핸드폰',
      index: '핸드폰',
      value: userData.tel,
    },
    {
      src: icCardinal,
      alt: '기수',
      index: '기수',
      value: userData.cardinals,
    },
    {
      src: icPosition,
      alt: '역할',
      index: '역할',
      value: userData.position,
    },
    {
      src: icEmail,
      alt: '메일',
      index: '메일',
      value: userData.email,
    },
  ];

  return !error && userData ? (
    <InfoWrapper>
      {myInfo.map((info) => (
        <InfoComponent
          src={info.src}
          alt={info.alt}
          index={info.index}
          value={info.value}
        />
      ))}
    </InfoWrapper>
  ) : (
    <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>
  );
};

export default MyInfo;
