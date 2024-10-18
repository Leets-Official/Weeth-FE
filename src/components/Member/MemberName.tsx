import { useNavigate } from 'react-router-dom';

import FE from '@/assets/images/ic_FE.svg';
import BE from '@/assets/images/ic_BE.svg';
import D from '@/assets/images/ic_DE.svg';
import MA from '@/assets/images/ic_MA.svg';

import * as S from '@/styles/memeber/MemberName.styled';

interface MemberNameProps {
  name: string;
  studentId: string;
  department: string;
  email: string;
  cardinal: number[];
  position: string;
  isLast?: boolean;
}

const MemberName: React.FC<MemberNameProps> = ({
  name,
  studentId,
  department,
  email,
  cardinal,
  position,
  isLast = false,
}) => {
  let imgSrc;
  let alt;
  const navi = useNavigate();

  if (position === 'FE') {
    imgSrc = FE;
    alt = 'FE';
  } else if (position === 'BE') {
    imgSrc = BE;
    alt = 'BE';
  } else if (position === 'D') {
    imgSrc = D;
    alt = 'D';
  } else {
    imgSrc = MA;
    alt = 'MA';
  }

  const onClickMember = () => {
    navi(`/member/${name}`, {
      state: { name, studentId, department, email, cardinal, position },
    });
  };

  return (
    <S.MemberWrapper>
      <S.MemberContent onClick={onClickMember}>
        <img src={imgSrc} alt={alt} />
        <S.TextWrapper>
          <div>{name}</div>
          <S.Caption>{cardinal[0]}기</S.Caption>
        </S.TextWrapper>
      </S.MemberContent>
      {!isLast && <S.Line />}
    </S.MemberWrapper>
  );
};

export default MemberName;
