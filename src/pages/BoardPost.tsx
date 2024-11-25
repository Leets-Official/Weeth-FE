import PostEditor from '@/components/Board/PostEditor';
import Header from '@/components/Header/Header';
import * as S from '@/styles/board/BoardPost.styled';
import { useState } from 'react';

// TODO: 글쓰기 타입에 따라 어드민 체크
const BoardPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';

  return (
    <S.PostWrapper>
      <Header
        title="글 쓰기"
        onClickRightButton={() => {}}
        RightButtonType="TEXT"
        isComplete={!isTitleEmpty && !isContentEmpty}
      />
      <PostEditor
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />
    </S.PostWrapper>
  );
};

export default BoardPost;
