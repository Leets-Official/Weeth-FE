import createStudy, { PostRequestType } from '@/api/usePostStudy';
import PostEditor from '@/components/Board/PostEditor';
import Header from '@/components/Header/Header';
import * as S from '@/styles/board/BoardPost.styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// TODO: 글쓰기 타입에 따라 어드민 체크
const BoardPost = () => {
  const navi = useNavigate();
  const { type } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState([]);

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';

  const onSave = async () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      const postData: PostRequestType = {
        title,
        content,
        files,
      };

      if (type === 'study') {
        await createStudy(postData);
        navi('/study');
      }
    } catch (error) {
      console.error(error);
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
