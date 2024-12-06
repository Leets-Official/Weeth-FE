import * as S from '@/styles/member/InfoComponent.styled';

interface InfoComponentProps {
  src: string;
  alt: string;
  index: string;
  value: string | number | number[];
}

const InfoComponent: React.FC<InfoComponentProps> = ({
  src,
  alt,
  index,
  value,
}) => {
  let positionKo = 'none';

  switch (value) {
    case 'FE':
      positionKo = '프론트엔드';
      break;
    case 'BE':
      positionKo = '백엔드';
      break;
    case 'D':
      positionKo = '디자인';
      break;
    default:
      positionKo = '없음';
  }

  const renderValue = () => {
    if (index === '역할') {
      return positionKo;
    }
    if (index === '기수' && Array.isArray(value)) {
      return value.join(',');
    }
    return value;
  };

  // TODO: renderValue가 mainColor 스타일이었는데 해당 스타일이 존재하지 않아서,, 일단 그냥 div로 바꿨습니다.
  return (
    <div>
      <S.Info>
        <img src={src} alt={alt} />
        <S.Text>
          <div>{index}</div>
          <div>{renderValue()}</div>
        </S.Text>
      </S.Info>
      <S.Line />
    </div>
  );
};

export default InfoComponent;
