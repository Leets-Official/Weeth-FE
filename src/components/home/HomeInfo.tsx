import { useEffect, useState } from 'react';
import * as S from '@/styles/home/HomeInfo.styled';
import { StyledHomeMain } from '@/styles/home/HomeMain.styled';

import { useNavigate } from 'react-router-dom';
import Caption from '@/components/Button/Caption';
import FEChar from '@/assets/images/ic_char_FE.svg';
import FECharHover from '@/assets/images/ic_char_FE_hover.svg';
import BEChar from '@/assets/images/ic_char_BE.svg';
import BECharHover from '@/assets/images/ic_char_BE_hover.svg';
import DEChar from '@/assets/images/ic_char_DE.svg';
import DECharHover from '@/assets/images/ic_char_DE_hover.svg';
import PMChar from '@/assets/images/ic_char_PM.svg';
import PMCharHover from '@/assets/images/ic_char_PM_hover.svg';
import AdminIcon from '@/assets/images/ic_Master_BW.svg';
import DefaultIcon from '@/assets/images/ic_default_position.svg';

interface HomeInfoProps {
  position: string;
  cardinal: number | string;
  name: string;
  isAdmin: boolean;
}

const HomeInfo = ({ position, cardinal, name, isAdmin }: HomeInfoProps) => {
  const navigate = useNavigate();
  const [characterImg, setCharacterImg] = useState(DefaultIcon);
  const [userPart, setUserPart] = useState('');

  useEffect(() => {
    if (position) {
      switch (position) {
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
        case 'PM':
          setCharacterImg(PMChar);
          setUserPart('PM');
          break;
        default:
          break;
      }
    }
  }, [position]);

  const handleMouseEnter = () => {
    if (position) {
      switch (position) {
        case 'FE':
          setCharacterImg(FECharHover);
          break;
        case 'BE':
          setCharacterImg(BECharHover);
          break;
        case 'D':
          setCharacterImg(DECharHover);
          break;
        case 'PM':
          setCharacterImg(PMCharHover);
          setUserPart('PM');
          break;
        default:
          break;
      }
    }
  };

  const handleMouseLeave = () => {
    if (position) {
      switch (position) {
        case 'FE':
          setCharacterImg(FEChar);
          break;
        case 'BE':
          setCharacterImg(BEChar);
          break;
        case 'D':
          setCharacterImg(DEChar);
          break;
        case 'PM':
          setCharacterImg(PMChar);
          setUserPart('PM');
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
              {cardinal}기
            </Caption>
            <div>{name}</div>
          </S.Name>
          <S.NickNameContainer>
            {isAdmin && <S.Admin src={AdminIcon} alt="어드민" />} {userPart}
          </S.NickNameContainer>
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
