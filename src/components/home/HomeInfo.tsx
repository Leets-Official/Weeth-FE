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
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import AdminIcon from '@/assets/images/ic_Master_BW.svg';

const HomeInfo = () => {
  const navigate = useNavigate();
  const { userInfo, isLoading } = useGetUserInfo();
  const [characterImg, setCharacterImg] = useState('');
  const [userPart, setUserPart] = useState('');
  const { isAdmin } = useGetGlobaluserInfo();

  useEffect(() => {
    if (!isLoading && userInfo) {
      switch (userInfo.position) {
        case 'FE':
          setCharacterImg(FEChar);
          setUserPart('FE');
          break;
        case 'BE':
          setCharacterImg(BEChar);
          setUserPart('BE');
          break;
        case 'D':
          setCharacterImg(DEChar);
          setUserPart('D');
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
        case 'D':
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
        case 'D':
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
          <S.NickNameContainer>
            {isAdmin && <S.Admin src={AdminIcon} alt="어드민" />} {userPart}
          </S.NickNameContainer>
        </S.UserContainer>
        <S.RightButtonContainer>
          {isLoading || !userInfo ? (
            <S.LoadingContainer />
          ) : (
            <S.UserCharacter
              src={characterImg}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate(`/mypage`)}
              alt="User character icon"
            />
          )}
        </S.RightButtonContainer>
      </S.UserInfo>
    </StyledHomeMain>
  );
};

export default HomeInfo;
