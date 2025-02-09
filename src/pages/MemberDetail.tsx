import Header from '@/components/Header/Header';
import useGetUserDetail from '@/api/useGetUserDetail';
import FE from '@/assets/images/ic_char_FE.svg';
import BE from '@/assets/images/ic_char_BE.svg';
import D from '@/assets/images/ic_char_DE.svg';
import theme from '@/styles/theme';
import styled from 'styled-components';
import CardinalTag from '@/components/common/CardinalTag';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 370px;
  font-family: ${theme.font.regular};
`;

const PostionCharicter = styled.img`
  width: 203px;
  margin-top: 52px;
`;

const Content = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100vh;
  margin-top: 35px;
  background-color: ${(props) => props.color};
  padding-left: 42px;
`;

const CardinalList = styled.div`
  display: flex;
  gap: 3px;
`;

const MoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 32px;
  font-family: ${theme.font.semiBold};
  padding-top: 42px;
`;

const Department = styled.div`
  display: flex;
  gap: 16px;
`;

const Gray = styled.div`
  color: rgba(255, 255, 255, 0.6);
`;

const MemberDetail = () => {
  const { userDetail } = useGetUserDetail();

  const positionMap = {
    FE: {
      char: FE,
      name: '프론트엔드 파트',
      color: theme.color.negative,
    },
    BE: {
      char: BE,
      name: '백엔드 파트',
      color: theme.color.positive,
    },
    D: {
      char: D,
      name: '디자인 파트',
      color: theme.color.pointPink,
    },
  };

  const position = userDetail?.position || 'FE';
  const positionData =
    positionMap[position as keyof typeof positionMap] || positionMap.FE;

  return (
    <Wrapper>
      <Header RightButtonType="none" isAccessible>
        멤버
      </Header>
      <PostionCharicter src={positionData.char} alt={position} />
      <Content color={positionData.color}>
        <Title>{userDetail?.name}</Title>
        <CardinalList>
          {userDetail?.cardinals?.map((cardinal) => (
            <CardinalTag cardinal={cardinal} />
          ))}
        </CardinalList>

        <MoreInfo>
          <b>{positionData.name}</b>
          <Department>
            <div>{userDetail?.department}</div>
            <Gray>|</Gray>
            <Gray>{userDetail?.studentId}</Gray>
          </Department>
          <div>{userDetail?.email}</div>
        </MoreInfo>
      </Content>
    </Wrapper>
  );
};

export default MemberDetail;
