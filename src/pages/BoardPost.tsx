/* eslint-disable no-alert */
import createNotice from '@/api/usePostNotice';
import createStudy from '@/api/usePostStudy';
import FileUploader from '@/components/Board/FileUploader';
import PostEditor from '@/components/Board/PostEditor';
import PostFile from '@/components/Board/PostFile';
import Header from '@/components/Header/Header';
import { PostRequestType } from '@/types/PostRequestType';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import getFileUrl from '@/api/uploadFiles';

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
  const { type } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileNameList, setFileNameList] = useState<string[]>([]);
  const [fileData, setFileData] = useState<File[]>([]);

  console.log('file name', fileNameList);
  console.log('file data', fileData);

  useEffect(() => {
    setFileNameList(fileData.map((file) => file.name));
  }, [fileData]);

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';

  const handleDeleteFile = (fileName: string) => {
    setFileData((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName),
    );
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

    // 파일 데이터가 비어있지 않으면 getFileUrl 호출
    if (fileData.length === 0) {
      alert('파일을 선택해주세요.');
      return;
    }

    try {
      // 1. 서버에서 presigned URL을 받아옴
      const fileUrls = await getFileUrl(fileNameList, fileData);

      // 2. 각 파일에 대한 URL을 postData에 포함
      const postData: PostRequestType = {
        title,
        content,
        files: fileData.map((file, index) => ({
          fileName: file.name,
          fileUrl: fileUrls[index]?.putUrl?.split('?')[0],
        })),
      };

      // 3. 업로드 성공 후, 해당 게시물 타입에 맞는 API 호출
      if (type === 'study') {
        await createStudy(postData);
        navi('/board');
      } else if (type === 'notice') {
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
        <FileUploader files={fileData} setFiles={setFileData} />
        {fileData.length > 0 && (
          <>
            {fileData.map((file) => (
              <PostFile
                key={file.name}
                fileName={file.name}
                isDownload={false}
                onClick={() => handleDeleteFile(file.name)}
              />
            ))}
          </>
        )}
      </FileUploaderWrapper>
    </PostWrapper>
  );
};

export default BoardPost;
