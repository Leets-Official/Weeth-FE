import * as S from '@/styles/member/InfoComponent.styled';

interface InfoComponentProps {
  alt: string;
  index: string;
  value: string | number | number[] | undefined;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ alt, index, value }) => {
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
      positionKo = '';
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

  return (
    <div>
      <S.Info>
        <S.Text>
          <div>{index}</div>
          <S.Main>{renderValue()}</S.Main>
        </S.Text>
      </S.Info>
      <S.Line />
    </div>
  );
};

export default InfoComponent;
