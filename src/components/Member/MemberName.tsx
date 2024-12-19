import { useNavigate } from 'react-router-dom';

import BE from '@/assets/images/ic_BE.svg';
import D from '@/assets/images/ic_DE.svg';
import FE from '@/assets/images/ic_FE.svg';
import MA from '@/assets/images/ic_MA.svg';

import * as S from '@/styles/member/MemberName.styled';

interface MemberNameProps {
  userId: number;
  name: string;
  cardinal: number[];
  position: string;
  role: 'USER' | 'ADMIN';
  isLast?: boolean;
}

const MemberName: React.FC<MemberNameProps> = ({
  userId,
  name,
  cardinal,
  position,
  role,
  isLast = false,
}) => {
  let positionIcon;
  const navi = useNavigate();

  console.log(userId);

  if (position === 'FE') {
    positionIcon = FE;
  } else if (position === 'BE') {
    positionIcon = BE;
  } else if (position === 'D') {
    positionIcon = D;
  }

  const onClickMember = () => {
    navi(`/member/${userId}`);
  };

  return (
    <S.Wrapper>
      <S.Content onClick={onClickMember}>
        {role === 'ADMIN' ? (
          <img src={MA} alt="MA" />
        ) : (
          <img src={positionIcon} alt={String(positionIcon)} />
        )}
        <S.TextWrapper>
          <div>{name}</div>
          <S.Caption>{cardinal[0]}기</S.Caption>
        </S.TextWrapper>
      </S.Content>
      {!isLast && <S.Line />}
    </S.Wrapper>
  );
};

export default MemberName;
