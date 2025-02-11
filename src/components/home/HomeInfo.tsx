import * as S from '@/styles/home/HomeInfo.styled';
import { StyledHomeMain } from '@/styles/home/HomeMain.styled';
import useGetUserInfo from '@/api/useGetUserInfo';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Caption from '@/components/Button/Caption';

const UserCharacter = styled.img``;
const HomeInfo = () => {
  const navi = useNavigate();
  const { userInfo } = useGetUserInfo();

  const userName = userInfo?.name || 'Loading';
  const cardinal =
    Array.isArray(userInfo?.cardinals) && userInfo?.cardinals.length >= 2
      ? userInfo.cardinals[userInfo.cardinals.length - 1]
      : userInfo?.cardinals?.[0] || '...';
  return (
    <StyledHomeMain>
      <S.CaptionContainer>
        <Caption color="#ffffff" textcolor="#000000">
          {cardinal}기
        </Caption>
      </S.CaptionContainer>
      <S.UserInfo>
        <S.UserContainer>
          <S.Name>{userName}</S.Name>
          <S.NickName>Elite님</S.NickName>
        </S.UserContainer>
        <S.RightButtonContainer>
          <UserCharacter
            onClick={() => {
              navi(`/mypage`);
            }}
          />
        </S.RightButtonContainer>
      </S.UserInfo>
    </StyledHomeMain>
  );
};

export default HomeInfo;
