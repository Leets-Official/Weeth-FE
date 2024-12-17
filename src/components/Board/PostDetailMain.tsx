import theme from '@/styles/theme';
import styled from 'styled-components';
import CommentImage from '@/assets/images/ic_comment_count.svg';
import { formatDate } from 'fullcalendar';
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 23px 0 23px;
`;

const TitleText = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 24px;
`;

const SmallText = styled.div`
  color: #c1c1c1;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const DateText = styled.div`
  margin-left: 10px;
`;

const PostingContianer = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  line-height: 19.09px;
  white-space: pre-wrap;
  margin: 20px 0 20px 0;
`;

const CommentText = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  line-height: 14.32px;
  gap: 4px;
  font-family: ${theme.font.family.pretendard_semiBold};
  margin: 14px 0 10px 0;
`;

const PostDetailMain = ({ info }: PostDetailMainProps) => {
  const onClickDownload = (fileName: string) => {
    console.log(`${fileName} 파일 다운`);
  };

  console.log(info);
  const formattedDate = formatDate(info?.time ?? '');

  if (!info) return <div>Loading...</div>;

  return (
    <Container>
      <TitleText>{info.title}</TitleText>
      <SmallText>
        <div>{info.name}</div>
        <DateText>{formattedDate}</DateText>
      </SmallText>
      <PostingContianer>{info.content}</PostingContianer>
      {info.fileUrls.map((file) => (
        <PostFile
          key={file.fileId}
          fileName={file.fileName}
          isDownload
          onClick={() => onClickDownload(file.fileName)}
        />
      ))}
      <CommentText>
        <img src={CommentImage} alt="댓글 이미지" />
        <div>{info.commentCount}</div>
      </CommentText>
      <Line />
    </Container>
  );
};

export default PostDetailMain;
