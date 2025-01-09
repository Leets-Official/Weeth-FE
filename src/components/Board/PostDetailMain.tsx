import CommentImage from '@/assets/images/ic_comment_count.svg';
import { formatDate } from 'fullcalendar';
import * as S from '@/styles/board/PostDetail.styled';
import Line from '../common/Line';
import PostFile from './PostFile';

interface Comment {
  id: number;
  name: string;
  content: string;
  time: string;
}

interface FileUrl {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

interface BoardDetail {
  id: number;
  name: string;
  title: string;
  time: string;
  content: string;
  commentCount: number;
  comments: Comment[];
  fileUrls: FileUrl[];
}

interface PostDetailMainProps {
  info: BoardDetail | null;
}

const onClickDownload = async (fileName: string, fileUrl: string) => {
  try {
    // Fetch API로 파일 가져오기
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Blob 데이터 생성
    const blob = await response.blob();

    // Blob URL 생성
    const url = window.URL.createObjectURL(blob);

    // 동적으로 a 태그 생성
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // 다운로드 트리거
    document.body.appendChild(link);
    link.click();

    // DOM에서 태그 제거 및 Blob URL 해제
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

const PostDetailMain = ({ info }: PostDetailMainProps) => {
  const formattedDate = info?.time
    ? formatDate(new Date(info.time), {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Invalid Date';

  if (!info) return <div>Loading...</div>;

  return (
    <S.PostMainContainer>
      <S.PostMainTitleText>{info.title}</S.PostMainTitleText>
      <S.SmallText>
        <div>{info.name}</div>
        <S.DateText>{formattedDate}</S.DateText>
      </S.SmallText>
      <S.PostingContianer>{info.content}</S.PostingContianer>
      {info.fileUrls.map((file) => (
        <PostFile
          key={file.fileId}
          fileName={file.fileName}
          isDownload
          onClick={() => onClickDownload(file.fileName, file.fileUrl)}
        />
      ))}
      <S.CommentText>
        <img src={CommentImage} alt="댓글 이미지" />
        <div>{info.commentCount}</div>
      </S.CommentText>
      <Line />
    </S.PostMainContainer>
  );
};

export default PostDetailMain;
