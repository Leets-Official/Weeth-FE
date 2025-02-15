import Line from '@/components/common/Line';
import * as S from '@/styles/board/BoardPost.styled';

const PostEditor = ({
  title,
  setTitle,
  content,
  setContent,
}: {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
}) => {
  return (
    <S.PostWrapper>
      <S.TitleInput
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Line />
      <S.ContentInput
        placeholder="내용을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </S.PostWrapper>
  );
};

export default PostEditor;
