import Header from '@/components/Header/Header';
import useGetMemberDetail from '@/api/useGetMemberDetail';
import FE from '@/assets/images/ic_char_FE.svg';
import BE from '@/assets/images/ic_char_BE.svg';
import D from '@/assets/images/ic_char_DE.svg';
import Master from '@/assets/images/ic_Master.svg';
import clipFE from '@/assets/images/ic_FE_clip.svg';
import clipBE from '@/assets/images/ic_BE_clip.svg';
import clipDE from '@/assets/images/ic_DE_clip.svg';

import theme from '@/styles/theme';
import styled from 'styled-components';
import CardinalTag from '@/components/common/CardinalTag';
import Loading from '@/components/common/Loading';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 370px;
`;

const PostionCharicter = styled.img`
  margin-top: 52px;
`;

const ClipContainer = styled.div`
  width: 370px;
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translate(-50%);
`;

const Clip = styled.img`
  position: fixed;
  top: 288px;
  left: 34px;
`;

const ContentTop = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.gray[18]};
  gap: 20px;
  width: 350px;
  height: 136px;
  margin-top: 35px;
  box-sizing: border-box;

  border-radius: 19px 19px 0 0;
  padding-left: 16px;
`;

const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
  box-sizing: border-box;
  border: 1px solid ${theme.color.gray[18]};
  border-radius: 0 0 19px 19px;
  padding: 17px 14px 34px;
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

const Position = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: ${theme.font.semiBold};
`;

const Title = styled.div`
  display: flex;
  gap: 5px;
  font-size: 32px;
  font-family: ${theme.font.semiBold};
  padding-top: 42px;
`;

const Department = styled.div`
  display: flex;
  gap: 16px;
`;

const Gray = styled.div`
  color: ${theme.color.gray[65]};
`;

const MemberDetail = () => {
  const { memberDetail, error, loading } = useGetMemberDetail();

  const positionMap = {
    FE: {
      char: FE,
      clip: clipFE,
      name: '프론트엔드 파트',
      color: theme.color.negative,
    },
    BE: {
      char: BE,
      clip: clipBE,
      name: '백엔드 파트',
      color: theme.color.positive,
    },
    D: {
      char: D,
      clip: clipDE,
      name: '디자인 파트',
      color: theme.color.pointPink,
    },
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Wrapper>에러 발생: {error}</Wrapper>;
  }

  const position = memberDetail?.position;
  const positionData = position
    ? positionMap[position as keyof typeof positionMap]
    : undefined;

  return (
    <Wrapper>
      <Header RightButtonType="none" isAccessible>
        멤버
      </Header>
      {positionData && (
        <PostionCharicter src={positionData.char} alt={position} />
      )}
      <ClipContainer>
        <Clip src={positionData?.clip} alt="clip" />
      </ClipContainer>
      <ContentTop>
        <Title>
          <span>{memberDetail?.name}</span>
          {memberDetail?.role === 'ADMIN' && <img src={Master} alt="Master" />}
        </Title>
        <CardinalList>
          {memberDetail?.cardinals?.map((cardinal) => (
            <CardinalTag type="member" cardinal={cardinal} key={cardinal} />
          ))}
        </CardinalList>
      </ContentTop>
      <ContentBottom>
        <MoreInfo>
          {positionData && (
            <Position color={positionData.color}>{positionData.name}</Position>
          )}
          <Department>
            <div>{memberDetail?.department}</div>
            <Gray>|</Gray>
            <Gray>{memberDetail?.studentId}</Gray>
          </Department>
          <div>{memberDetail?.email}</div>
        </MoreInfo>
      </ContentBottom>
    </Wrapper>
  );
};

export default MemberDetail;
