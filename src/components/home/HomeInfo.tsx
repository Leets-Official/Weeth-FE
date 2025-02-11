import { useEffect, useState } from 'react';
import * as S from '@/styles/home/HomeInfo.styled';
import { StyledHomeMain } from '@/styles/home/HomeMain.styled';
import useGetUserInfo from '@/api/useGetUserInfo';

import { useNavigate } from 'react-router-dom';
import Caption from '@/components/Button/Caption';
import FEChar from '@/assets/images/ic_char_FE.svg';
import FECharHover from '@/assets/images/ic_char_FE_hover.svg';
import BEChar from '@/assets/images/ic_char_BE.svg';
import BECharHover from '@/assets/images/ic_char_BE_hover.svg';
import DEChar from '@/assets/images/ic_char_DE.svg';
import DECharHover from '@/assets/images/ic_char_DE_hover.svg';

const HomeInfo = () => {
  const navigate = useNavigate();
  const { userInfo, isLoading } = useGetUserInfo();
  const [characterImg, setCharacterImg] = useState('');

  useEffect(() => {
    if (!isLoading && userInfo) {
      switch (userInfo.position) {
        case 'FE':
          setCharacterImg(FEChar);
          break;
        case 'BE':
          setCharacterImg(BEChar);
          break;
        case 'DE':
          setCharacterImg(DEChar);
          break;
        default:
          setCharacterImg('');
          break;
      }
    }
  }, [userInfo, isLoading]);

  const handleMouseEnter = () => {
    if (!isLoading && userInfo) {
      switch (userInfo.position) {
        case 'FE':
          setCharacterImg(FECharHover);
          break;
        case 'BE':
          setCharacterImg(BECharHover);
          break;
        case 'DE':
          setCharacterImg(DECharHover);
          break;
        default:
          break;
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isLoading && userInfo) {
      switch (userInfo.position) {
        case 'FE':
          setCharacterImg(FEChar);
          break;
        case 'BE':
          setCharacterImg(BEChar);
          break;
        case 'DE':
          setCharacterImg(DEChar);
          break;
        default:
          break;
      }
    }
  };

  return (
    <StyledHomeMain>
      <S.UserInfo>
        <S.UserContainer>
          <S.Name>
            <Caption color="#ffffff" textcolor="#000000">
              {userInfo?.cardinals?.[userInfo.cardinals.length - 1] || '...'}기
            </Caption>
            <div>{userInfo?.name || 'Loading...'}</div>
          </S.Name>
          <S.NickName>Elite님</S.NickName>
        </S.UserContainer>
        <S.RightButtonContainer>
          <S.UserCharacter
            src={characterImg}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate(`/mypage`)}
            alt="User character icon"
          />
        </S.RightButtonContainer>
      </S.UserInfo>
    </StyledHomeMain>
  );
};

export default HomeInfo;
