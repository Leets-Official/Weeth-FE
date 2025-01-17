import InfoComponent from '@/components/Member/InfoComponent';
import icCardinal from '@/assets/images/ic_cardinal.svg';
import icDepartment from '@/assets/images/ic_department.svg';
import icEmail from '@/assets/images/ic_mail.svg';
import icName from '@/assets/images/ic_name.svg';
import icPosition from '@/assets/images/ic_position.svg';
import icStudentId from '@/assets/images/ic_studentID.svg';
import Header from '@/components/Header/Header';
import * as S from '@/styles/member/MemberDetail.styled';
import useGetUserDetail from '@/api/useGetUserDetail';

const MemberDetail = () => {
  const { userDetail } = useGetUserDetail();

  const infoData = [
    {
      src: icName,
      alt: '이름',
      index: '이름',
      value: userDetail?.name,
    },
    {
      src: icStudentId,
      alt: '학번',
      index: '학번',
      value: userDetail?.studentId,
    },
    {
      src: icDepartment,
      alt: '학과',
      index: '학과',
      value: userDetail?.department,
    },
    {
      src: icCardinal,
      alt: '기수',
      index: '기수',
      value: userDetail?.cardinals,
    },
    {
      src: icPosition,
      alt: '역할',
      index: '역할',
      value: userDetail?.position,
    },
    {
      src: icEmail,
      alt: '메일',
      index: '메일',
      value: userDetail?.email,
    },
  ];
  //-----------------------
  return (
    <S.Wrapper>
      <Header RightButtonType="none">멤버</Header>
      <S.InfoWrapper>
        {infoData.map((info) => (
          <InfoComponent
            src={info.src}
            alt={info.alt}
            index={info.index}
            value={info.value}
          />
        ))}
      </S.InfoWrapper>
    </S.Wrapper>
  );
};

export default MemberDetail;
