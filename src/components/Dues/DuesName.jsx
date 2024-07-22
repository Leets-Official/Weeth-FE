import styled from 'styled-components';
import PropTypes from 'prop-types';

import FE from '../../assets/images/Property 1=FE.png';
import BE from '../../assets/images/Property 1=BE.png';
import D from '../../assets/images/Property 1=_DE.png';
import MA from '../../assets/images/Property 1=MA.png';

const MemberWrapper = styled.div`
  padding: 20px 10px 0px 10px;
`;

const MemberContent = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  border: 1px solid;
  color: #4d4d4d;
  width: 325px;
  margin: auto;
  margin-top: 10px;
  transform: scaleY(0.2);
`;

const Caption = styled.div`
  font-size: 12px;
`;

const TextWrapper = styled.div`
  margin-left: 10px;
`;

const DuesName = ({ name, cardinal, position }) => {
  let imgSrc;
  let alt;

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
  return (
    <MemberWrapper>
      <MemberContent>
        <img src={imgSrc} alt={alt} />
        <TextWrapper>
          <div>{name}</div>
          <Caption>{cardinal}기</Caption>
        </TextWrapper>
      </MemberContent>
      <Line />
    </MemberWrapper>
  );
};

DuesName.propTypes = {
  name: PropTypes.string.isRequired,
  cardinal: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
};

export default DuesName;
