import useGetUserInfo from '@/api/useGetUserInfo';
import theme from '@/styles/theme';
import styled from 'styled-components';
import InfoItem from '@/components/MyPage/InfoItem';
import CardinalTag from '@/components/common/CardinalTag';
import Loading from '../common/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 19px;
`;

const ContentWrapper = styled.div`
  padding-top: 20px;
`;

const Title = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 20px;
  margin: 0 0 10px 10px;
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
  const { userInfo, loading } = useGetUserInfo();

  if (!userInfo) {
    return null;
  }

  const positionMap: Record<string, string> = {
    FE: '프론트엔드',
    BE: '백엔드',
    D: '디자인',
  };

  const position = positionMap[userInfo.position] || '';

  if (loading) {
    return <Loading />;
  }

  return userInfo ? (
    <Container>
      <ContentWrapper>
        <Title>개인정보</Title>
        <Content>
          <InfoItem label="이름">{userInfo.name}</InfoItem>
          <InfoItem label="핸드폰">{userInfo.tel}</InfoItem>
          <InfoItem label="이메일" isLast>
            {userInfo.email}
          </InfoItem>
        </Content>
      </ContentWrapper>

      <ContentWrapper>
        <Title>활동정보</Title>
        <Content>
          <InfoItem label="학과">{userInfo.department}</InfoItem>
          <InfoItem label="학번">{userInfo.studentId}</InfoItem>
          <InfoItem label="기수">
            {userInfo.cardinals.map((cardinal) => (
              <CardinalTag type="mypage" cardinal={cardinal} />
            ))}
          </InfoItem>
          <InfoItem label="역할" isLast readOnly>
            {position}
          </InfoItem>
        </Content>
      </ContentWrapper>
    </Container>
  ) : (
    <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>
  );
};

export default MyInfo;
