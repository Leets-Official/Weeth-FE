import styled from 'styled-components';
import BoardComponent from '../components/Board/NoticeComponent';

const NoticeContainer = styled.div`
  width: 370px;
`;

const BoardNotice = () => {
  return (
    <NoticeContainer>
      <BoardComponent />
    </NoticeContainer>
  );
};

export default BoardNotice;
