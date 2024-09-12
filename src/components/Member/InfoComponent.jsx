import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

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

const InfoComponent = ({ src, alt, index, value }) => {
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
    if (index === '기수') {
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

InfoComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
};

export default InfoComponent;
