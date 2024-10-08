import styled from 'styled-components';

import { useLocation } from 'react-router-dom';
import MemberHeader from '@/components/Member/MemberHeader';
import InfoComponent from '@/components/Member/InfoComponent';

import icName from '@/assets/images/ic_name.svg';
import icId from '@/assets/images/ic_studentID.svg';
import icDepartment from '@/assets/images/ic_department.svg';
import icCardinal from '@/assets/images/ic_cardinal.svg';
import icPosition from '@/assets/images/ic_position.svg';
import icEmail from '@/assets/images/ic_mail.svg';
import useCustomBack from '@/router/useCustomBack';
import theme from '@/styles/theme';

const StyledDetails = styled.div`
  width: 370px;
  font-family: ${theme.font.family.pretendard_regular};
`;

const InfoWrapper = styled.div`
  padding-top: 20px;
`;

const UserDetail = () => {
  useCustomBack('/member');
  const location = useLocation();
  const { name, studentId, department, email, cardinal, position } =
    location.state;

  return (
    <StyledDetails>
      <MemberHeader />
      <InfoWrapper>
        <InfoComponent src={icName} alt="smile" index="이름" value={name} />
        <InfoComponent src={icId} alt="heart" index="학번" value={studentId} />
        <InfoComponent
          src={icDepartment}
          alt="pencil"
          index="학과"
          value={department}
        />
        <InfoComponent
          src={icCardinal}
          alt="tag"
          index="기수"
          value={cardinal}
        />
        <InfoComponent
          src={icPosition}
          alt="monitor"
          index="역할"
          value={position}
        />
        <InfoComponent src={icEmail} alt="mail" index="메일" value={email} />
      </InfoWrapper>
    </StyledDetails>
  );
};

export default UserDetail;
