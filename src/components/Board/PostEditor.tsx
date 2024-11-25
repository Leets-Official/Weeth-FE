import Line from '@/components/common/Line';
import * as S from '@/styles/board/BoardPost.styled';
import FileUploader from './FileUploader';

// TODO: 글쓰기 타입에 따라 어드민 체크
const PostEditor = () => {
  return (
    <>
      <S.PostWrapper>
        <S.TitleInput placeholder="제목" />
        <Line />
        <S.ContentInput placeholder="내용을 입력하세요." />
      </S.PostWrapper>
      <FileUploader />
    </>
  );
};

export default PostEditor;
