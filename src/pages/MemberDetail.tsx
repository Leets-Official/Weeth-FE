import { useLocation } from 'react-router-dom';
import MemberHeader from '@/components/Member/MemberHeader';
import InfoComponent from '@/components/Member/InfoComponent';

import icName from '@/assets/images/ic_name.svg';
import icStudentId from '@/assets/images/ic_studentID.svg';
import icDepartment from '@/assets/images/ic_department.svg';
import icCardinal from '@/assets/images/ic_cardinal.svg';
import icPosition from '@/assets/images/ic_position.svg';
import icEmail from '@/assets/images/ic_mail.svg';
import useCustomBack from '@/hooks/useCustomBack';

import * as S from '@/styles/member/MemberDetail.styled';

const MemberDetail = () => {
  // TODO: 서버 api 추가 (멤버 상세 조회) 후 로직 수정 필요
  const location = useLocation();
  const {
    name,
    studentId,
    department,
    email,
    cardinal,
    position,
    currentCardinal,
  } = location.state;
  useCustomBack(`/member?cardinal=${currentCardinal}`);

  const infoData = [
    {
      src: icName,
      alt: '이름',
      index: '이름',
      value: name,
    },
    {
      src: icStudentId,
      alt: '학번',
      index: '학번',
      value: studentId,
    },
    {
      src: icDepartment,
      alt: '학과',
      index: '학과',
      value: department,
    },
    {
      src: icCardinal,
      alt: '기수',
      index: '기수',
      value: cardinal,
    },
    {
      src: icPosition,
      alt: '역할',
      index: '역할',
      value: position,
    },
  ];
  //-----------------------
  return (
    <S.Wrapper>
      <MemberHeader />
      <S.InfoWrapper>
        {infoData.map((info) => (
          <InfoComponent
            src={info.src}
            alt={info.alt}
            index={info.index}
            value={info.value}
          />
        ))}
        <InfoComponent src={icEmail} alt="mail" index="메일" value={email} />
      </S.InfoWrapper>
    </S.Wrapper>
  );
};

export default MemberDetail;
