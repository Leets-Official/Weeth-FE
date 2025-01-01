/* eslint-disable no-alert */
import { useGetFileUrl } from '@/api/useGetFileUrl';
import createNotice from '@/api/usePostNotice';
import createStudy from '@/api/usePostStudy';
import PostEditor from '@/components/Board/PostEditor';
import Header from '@/components/Header/Header';
import * as S from '@/styles/board/BoardPost.styled';
import { CustomFiles, PostRequestType } from '@/types/PostRequestType';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BoardPost = () => {
  const navi = useNavigate();
  const { type } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileNameList, setFileNameList] = useState<string[]>([]);

  const { fileUrl, error } = useGetFileUrl(fileNameList);

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';

  const onSave = async () => {
    if (isTitleEmpty) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (isContentEmpty) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (error) {
      alert('파일 업로드 중 문제가 발생했습니다. 다시 시도해주세요.');
      return;
    }

    try {
      console.log(fileUrl);

      // Step 1: 파일 데이터 변환
      const filesToUpload: CustomFiles[] =
        fileUrl?.map((file: { fileName: string; putUrl: string }) => ({
          fileName: file.fileName,
          fileUrl: file.putUrl.split('?')[0],
        })) || [];

      // Step 2: 게시물 데이터 생성
      const postData: PostRequestType = {
        title,
        content,
        files: filesToUpload,
      };

      if (type === 'study') {
        await createStudy(postData);
        navi('/study');
      } else if (type === 'notice') {
        await createNotice(postData);
        navi('/notice');
      }
    } catch {
      alert('게시물 저장 중 문제가 발생했습니다. 다시 시도해주세요.');
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
        fileNameList={fileNameList}
        setFileNameList={setFileNameList}
      />
    </S.PostWrapper>
  );
};

export default BoardPost;
