import useGetUserInfo from '@/api/useGetUserInfo';
import theme from '@/styles/theme';
import styled from 'styled-components';
import InfoItem from './InfoItem';

const InfoWrapper = styled.div`
  padding-top: 20px;
`;

const Content = styled.div`
  width: 345px;
  background-color: ${theme.color.gray[18]};
  border: 1px solid ${theme.color.gray[30]};
  border-radius: 14px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-family: ${theme.font.semiBold};
`;

const MyInfo = () => {
  const { userInfo } = useGetUserInfo();

  if (!userInfo) {
    return null;
  }

  return userInfo ? (
    <>
      <InfoWrapper>
        <div>개인정보</div>
        <Content>
          <InfoItem label="이름">{userInfo.name}</InfoItem>
          <InfoItem label="핸드폰">{userInfo.tel}</InfoItem>
          <InfoItem label="이메일">{userInfo.email}</InfoItem>
          <InfoItem label="로그인">카카오 로그인 완료</InfoItem>
        </Content>
      </InfoWrapper>

      <InfoWrapper>
        <div>활동정보</div>
        <Content>
          <InfoItem label="학과">{userInfo.department}</InfoItem>
          <InfoItem label="학번">{userInfo.studentId}</InfoItem>
          <InfoItem label="기수">
            {/* {userInfo.cardinals.map((cardinal) => (
              <CardinalTag />
            ))} */}
          </InfoItem>
          <InfoItem label="역할">{userInfo.position}</InfoItem>
        </Content>
      </InfoWrapper>
    </>
  ) : (
    <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>
  );
};

export default MyInfo;
