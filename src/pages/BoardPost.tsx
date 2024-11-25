import PostEditor from '@/components/Board/PostEditor';
import Header from '@/components/Header/Header';
import * as S from '@/styles/board/BoardPost.styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: 글쓰기 타입에 따라 어드민 체크
const BoardPost = () => {
  const navi = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';

  const onSave = () => {
    if (!isTitleEmpty && !isContentEmpty) {
      // api 호출 로직
      navi('/board');
    } else if (isTitleEmpty) {
      // TODO: toast로 변경 예정
      alert('제목을 입력해주세요.');
    } else if (isContentEmpty) {
      alert('내용을 입력해주세요.');
    }
  };

  return (
    <S.PostWrapper>
      <Header
        title="글 쓰기"
        onClickRightButton={onSave}
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
