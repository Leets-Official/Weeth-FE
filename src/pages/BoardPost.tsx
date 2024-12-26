/* eslint-disable no-alert */
import createNotice from '@/api/usePostNotice';
import createStudy from '@/api/usePostStudy';
import PostEditor from '@/components/Board/PostEditor';
import Header from '@/components/Header/Header';
import * as S from '@/styles/board/BoardPost.styled';
import { CustomFiles, PostRequestType } from '@/types/PostRequestType';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// TODO: 글쓰기 타입에 따라 어드민 체크
const BoardPost = () => {
  const navi = useNavigate();
  const { type } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<CustomFiles[]>([]);

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
      } else if (type === 'notice') {
        await createNotice(postData);
        navi('/notice');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
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
        setFiles={setFiles}
      />
    </S.PostWrapper>
  );
};

export default BoardPost;
