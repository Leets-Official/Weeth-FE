import CommentImage from '@/assets/images/ic_comment_count.svg';
import * as S from '@/styles/board/PostDetail.styled';
import Line from '@/components/common/Line';
import PostFile from '@/components/Board/PostFile';

const PostDetailMain = () => {
  const onClickDownload = () => {
    console.log('파일 다운');
  };
  return (
    <S.PostMainContainer>
      <S.PostMainTitleText> 스터디 제못</S.PostMainTitleText>
      <S.SmallText>
        <div>김위드</div>
        <S.DateText>2024/03/43</S.DateText>
      </S.SmallText>
      <S.PostingContianer> 본문 </S.PostingContianer>
      <PostFile
        fileName="파일이름이 길어질 때, 사실 그렇게 보이면.pdf"
        isDownload
        onClick={onClickDownload}
      />
      <S.CommentText>
        <img src={CommentImage} alt="댓글 이미지" />
        <div>3</div>
      </S.CommentText>
      <Line />
    </S.PostMainContainer>
  );
};

export default PostDetailMain;
