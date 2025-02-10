import { useNavigate } from 'react-router-dom';

import BE from '@/assets/images/ic_BE.svg';
import D from '@/assets/images/ic_DE.svg';
import FE from '@/assets/images/ic_FE.svg';

import Master from '@/assets/images/ic_Master_BW.svg';

import * as S from '@/styles/member/MemberName.styled';

interface MemberItemProps {
  userId: number;
  name: string;
  cardinal: number[];
  position: string;
  role: 'USER' | 'ADMIN';
}

const MemberItem: React.FC<MemberItemProps> = ({
  userId,
  name,
  cardinal,
  position,
  role,
}) => {
  let positionIcon;
  let positionName;
  const navi = useNavigate();

  if (position === 'FE') {
    positionName = '프론트엔드';
    positionIcon = FE;
  } else if (position === 'BE') {
    positionName = '백엔드';
    positionIcon = BE;
  } else if (position === 'D') {
    positionName = '디자이너';
    positionIcon = D;
  }

  const onClickMember = () => {
    navi(`/member/${userId}`);
  };

  return (
    <S.Wrapper>
      <S.Content onClick={onClickMember}>
        <img src={positionIcon} alt={String(positionIcon)} />
        <S.TextWrapper>
          <S.Title>{name}</S.Title>
          <S.Caption>
            {role === 'ADMIN' ? <img src={Master} alt="MA" /> : null}
            <span>{positionName}</span>
            <span>|</span>
            <span>{cardinal.map((num) => `${num}기`).join(' · ')}</span>
          </S.Caption>
        </S.TextWrapper>
      </S.Content>
    </S.Wrapper>
  );
};

export default MemberItem;
