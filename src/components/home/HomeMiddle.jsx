import styled from 'styled-components';
import Caption from '../Caption';
import RightButton from '../RightButton';
import './HomeMiddle.css';

const StyledHomeMiddle = styled.div`
  margin-top: 50px;
  margin-left: -20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: fit-content;
  padding: 10px;
`;

const HomeMiddle = () => {
  return (
    <StyledHomeMiddle>
      <Caption color="#ffffff" textColor="#000000">
        3기
      </Caption>
      <div className="user-info">
        <div className="name">김위드</div>
        <div className="nick-name">Elite님</div>
        <div className="right-button">
          <RightButton text=">" />
        </div>
      </div>
      <div className="box-container">dd</div>
    </StyledHomeMiddle>
  );
};

export default HomeMiddle;
