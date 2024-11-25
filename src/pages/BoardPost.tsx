import icClip from '@/assets/images/ic_clip.svg';
import Line from '@/components/common/Line';
import Header from '@/components/Header/Header';
import * as S from '@/styles/board/BoardPost.styled';

const BoardPost = () => {
  return (
    <>
      <S.PostWrapper>
        <Header
          title="글 쓰기"
          onClickRightButton={() => {}}
          RightButtonType="TEXT"
        />
        <S.TitleInput placeholder="제목" />
        <Line />
        <S.ContentInput placeholder="내용을 입력하세요." />
      </S.PostWrapper>
      <S.FileButton src={icClip} />
    </>
  );
};

export default BoardPost;
