import PostEditor from '@/components/Board/PostEditor';
import Header from '@/components/Header/Header';
import * as S from '@/styles/board/BoardPost.styled';

// TODO: 글쓰기 타입에 따라 어드민 체크
const BoardPost = () => {
  return (
    <S.PostWrapper>
      <Header
        title="글 쓰기"
        onClickRightButton={() => {}}
        RightButtonType="TEXT"
      />
      <PostEditor />
    </S.PostWrapper>
  );
};

export default BoardPost;
