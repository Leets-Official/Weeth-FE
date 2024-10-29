import { useNavigate, useSearchParams } from 'react-router-dom';

import BE from '@/assets/images/ic_BE.svg';
import D from '@/assets/images/ic_DE.svg';
import FE from '@/assets/images/ic_FE.svg';
import MA from '@/assets/images/ic_MA.svg';

import * as S from '@/styles/memeber/MemberName.styled';

interface MemberNameProps {
  name: string;
  cardinal: number[];
  studentId: number;
  department: string;
  email: string;
  position: string;
  role: 'USER' | 'ADMIN';
  isLast?: boolean;
}

const MemberName: React.FC<MemberNameProps> = ({
  name,
  cardinal,
  studentId,
  department,
  email,
  position,
  role,
  isLast = false,
}) => {
  let positionIcon;
  const navi = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCardinal = searchParams.get('cardinal');

  if (position === 'FE') {
    positionIcon = FE;
  } else if (position === 'BE') {
    positionIcon = BE;
  } else if (position === 'D') {
    positionIcon = D;
  }

  const onClickMember = () => {
    navi(`/member/${name}`, {
      state: {
        name,
        studentId,
        department,
        email,
        cardinal,
        position,
        currentCardinal,
      },
    });
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
