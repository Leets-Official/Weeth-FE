import styled from 'styled-components';
import BoardComponent from '../components/Board/NoticeComponent';
import NoticeHeader from '../components/Board/NoticeHeader';
import NoticeMiddle from '../components/Board/NoticeMiddle';

const NoticeContainer = styled.div`
  width: 370px;
`;

const BoardNotice = () => {
  return (
    <NoticeContainer>
      <NoticeHeader />
      <NoticeMiddle />
      <BoardComponent />
    </NoticeContainer>
  );
};

export default BoardNotice;
