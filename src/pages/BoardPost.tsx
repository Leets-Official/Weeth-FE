/* eslint-disable no-console */
/* eslint-disable no-alert */
import createNotice from '@/api/postNotice';
import editBoard from '@/api/editBoard';
import editNotice from '@/api/editNotice';
import FileUploader from '@/components/Board/FileUploader';
import PostEditor from '@/components/Board/PostEditor';
import PostFile from '@/components/Board/PostFile';
import Header from '@/components/Header/Header';
import { PostRequestType } from '@/types/PostRequestType';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import getFileUrl from '@/api/uploadFiles';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import createBoard from '@/api/postBoard';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  padding-bottom: 20px;
  ul {
    margin: 0;
  }
`;

const FileUploaderWrapper = styled.div`
  margin-left: 20px;
  align-items: flex-start;
  top: calc(var(--vh, 1vh) * 40 + 120px);
`;

const BoardPost = () => {
  const navi = useNavigate();
  const { postId } = useParams();

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileNameList, setFileNameList] = useState<string[]>([]);

  const numericPostId = postId ? parseInt(postId, 10) : 0;

  console.log(fileNameList);

  let type = '';
  if (path === 'board') {
    type = pathArray[3] === 'edit' ? 'editBoard' : 'posts';
  } else if (path === 'notice') {
    type = pathArray[3] === 'edit' ? 'editNotice' : 'notices';
  }

  const { boardDetailInfo } = useGetBoardDetail(type ?? '', numericPostId);

  useEffect(() => {
    setTitle(boardDetailInfo?.title ?? '');
    setContent(boardDetailInfo?.content ?? '');
    setFileNameList(
      boardDetailInfo?.fileUrls.map((file) => file.fileName) ?? [],
    );
  }, [boardDetailInfo]);

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';

  const handleDeleteFile = (fileName: string) => {
    setFileNameList((prevNames) =>
      prevNames.filter((name) => name !== fileName),
    );
  };

  // onSave에서 파일 업로드 처리
  const onSave = async () => {
    if (isTitleEmpty) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (isContentEmpty) {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      // 1. 서버에서 presigned URL을 받아옴
      const fileUrls = await getFileUrl(fileNameList, []);

      // 2. 각 파일에 대한 URL을 postData에 포함
      const postData: PostRequestType = {
        title,
        content,
        files: fileNameList.map((fileName, index) => ({
          fileName,
          fileUrl: fileUrls[index]?.putUrl?.split('?')[0],
        })),
      };

      // 3. 업로드 성공 후, 해당 게시물 타입에 맞는 API 호출
      if (type === 'editBoard') {
        await editBoard(postData, numericPostId);
        navi('/board');
      } else if (type === 'editNotice') {
        await editNotice(postData, numericPostId);
        navi('/notice');
      } else if (type === 'posts') {
        await createBoard(postData);
        navi('/board');
      } else if (type === 'notices') {
        await createNotice(postData);
        navi('/notice');
      }
    } catch (error) {
      console.log(error);
      alert('파일 업로드 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <PostWrapper>
      <Header
        onClickRightButton={onSave}
        RightButtonType="TEXT"
        isAccessible
        isComplete={!isTitleEmpty && !isContentEmpty}
      >
        글 쓰기
      </Header>
      <PostEditor
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />

      <FileUploaderWrapper>
        <FileUploader files={fileNameList} setFiles={setFileNameList} />
        {fileNameList.length > 0 && (
          <>
            {fileNameList.map((file) => (
              <PostFile
                key={file}
                fileName={file}
                isDownload={false}
                onClick={() => handleDeleteFile(file)}
              />
            ))}
          </>
        )}
      </FileUploaderWrapper>
    </PostWrapper>
  );
};

export default BoardPost;
