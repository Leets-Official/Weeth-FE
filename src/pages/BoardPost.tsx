/* eslint-disable no-alert */
import getFileUrl from '@/api/useGetFileUrl';
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
  const [files, setFiles] = useState<CustomFiles[]>([]);
  const [fileNameList, setFileNameList] = useState<string[]>([]);

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

    console.log(fileNameList);

    try {
      // Step 1: 파일 업로드 API 호출
      if (fileNameList.length > 0) {
        const response = await getFileUrl(fileNameList);
        console.log(response);

        setFiles(
          response.data.data.map(
            (file: { fileName: string; putUrl: string }) => ({
              fileName: file.fileName,
              fileUrl: file.putUrl.split('?')[0],
            }),
          ),
        );
      }

      // Step 2: 게시물 데이터 생성
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
        fileNameList={fileNameList}
        setFileNameList={setFileNameList}
      />
    </S.PostWrapper>
  );
};

export default BoardPost;
