import styled from 'styled-components';
import FolderImage from '@/assets/images/ic_folder.svg';
import DownloadImage from '@/assets/images/ic_download.svg';

const Container = styled.div`
  width: 86%;
  display: flex;
  flex-direction: row;
  margin: 20px 23px 0 23px;
  border: 1px solid #4d4d4d; // 색상은 다음이슈에서 변경된 부분 일괄 적용 하겟습니다!! gray30
  background-color: #2f2f2f; //gray18
`;
const PostFile = () => {
  return (
    <Container>
      <img src={FolderImage} alt="파일 이미지" />
      <div>파일 이름.</div>
      <img src={DownloadImage} alt="다운로드 이미지" />
    </Container>
  );
};

export default PostFile;
