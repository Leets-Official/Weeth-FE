import styled from 'styled-components';
import BoardComponent from '../components/Board/NoticeComponent';
import NoticeHeader from '../components/Board/NoticeHeader';

const NoticeContainer = styled.div`
  width: 370px;
`;

const BoardNotice = () => {
  return (
    <NoticeContainer>
      <NoticeHeader />
      <BoardComponent />
    </NoticeContainer>
  );
};

export default BoardNotice;
