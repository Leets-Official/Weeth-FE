import styled from 'styled-components';
import theme from '../../styles/theme';

interface InfoComponentProps {
  src: string;
  alt: string;
  index: string;
  value: string | number | number[];
}

const Line = styled.div`
  border: 1px solid;
  width: 325px;
  transform: scaleY(0.2);
  margin: auto;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 25px;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 10px;
`;

const MainColor = styled.div`
  color: ${theme.color.main.mainColor};
`;

const InfoComponent: React.FC<InfoComponentProps> = ({ src, alt, index, value }) => {
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
    case 'MA':
      positionKo = '임원';
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

  return (
    <div>
      <Info>
        <img src={src} alt={alt} />
        <Text>
          <div>{index}</div>
          <MainColor>{renderValue()}</MainColor>
        </Text>
      </Info>
      <Line />
    </div>
  );
};

export default InfoComponent;
