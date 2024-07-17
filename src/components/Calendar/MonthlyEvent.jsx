import React from 'react';
import styled from 'styled-components';

const StyledYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MonthlyContent = styled.div`
  background-color: #2e2e2e;
  padding: 15px;
  width: 30vw;
  border-radius: 20px;
  margin: 10px;
`;

const MonthlyEvent = () => {
  return (
    <StyledYear>
      <h3>1월</h3>
      <MonthlyContent>
        첫번째 일정
        <br />
        두번째 일정
      </MonthlyContent>
    </StyledYear>
  );
};

// MonthlyEvent.propTypes = {
//   mockEventYear: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       start: PropTypes.string.isRequired,
//       end: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };

export default MonthlyEvent;
