import styled from 'styled-components';
import FolderImage from '@/assets/images/ic_folder.svg';
import DownloadImage from '@/assets/images/ic_download.svg';
import CloseImage from '@/assets/images/ic_red_close.svg';

const Container = styled.div`
  width: 307px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center; /* center 정렬 오타 수정 */
  border: 1px solid #4d4d4d; // 색상은 다음 이슈에서 변경된 부분 일괄 적용 예정 (gray30)
  background-color: #2f2f2f; // gray18
  border-radius: 5px;
  padding: 0 8px;
`;

const FolderIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const FileName = styled.div`
  font-size: 14px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RightIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  cursor: pointer;
`;

interface PostFileProps {
  fileName: string;
  isDownload?: boolean;
}

// isDownload가 true이면 다운로드 버튼 보이고 false이면 x 버튼 보여요!
// 파일 이름은 필수로 보내주셔야 합니다.
// 버튼에 대한 작동 함수는 api 연결 하면서 쓰려고 일단 props에 안 넣었어요!
const PostFile = ({ fileName = '', isDownload = true }: PostFileProps) => {
  const cuttedFileName =
    fileName.length > 22 ? `${fileName.slice(0, 21)}...` : fileName;

  const onClickDownload = () => {
    console.log('다운로드');
  };

  const onClickClose = () => {
    console.log('닫기');
  };

  return (
    <Container>
      <FolderIcon src={FolderImage} alt="파일 폴더 아이콘" />
      <FileName>{cuttedFileName}</FileName>
      {isDownload ? (
        <RightIcon
          src={DownloadImage}
          alt="다운로드 아이콘"
          onClick={onClickDownload}
        />
      ) : (
        <RightIcon src={CloseImage} alt="닫기 아이콘" onClick={onClickClose} />
      )}
    </Container>
  );
};

export default PostFile;
