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

const onClickDownload = (fileName: string, fileUrl: string) => {
  // 동적으로 a 태그 생성
  const link = document.createElement('a');
  // 파일 URL 설정
  link.href = fileUrl;
  // 다운로드될 파일 이름 설정
  link.download = fileName;
  link.click(); // 다운로드 트리거
};

const PostDetailMain = ({ info }: PostDetailMainProps) => {
  const formattedDate = formatDate(info?.time ?? '');

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
