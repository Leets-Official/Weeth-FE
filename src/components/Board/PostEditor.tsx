import icDelte from '@/assets/images/ic_delete.svg';
import Line from '@/components/common/Line';
import * as S from '@/styles/board/BoardPost.styled';
import { useState, useEffect } from 'react';
import { CustomFiles } from '@/types/PostRequestType';
import FileUploader from './FileUploader';

// TODO: 글쓰기 타입에 따라 어드민 체크
const PostEditor = ({
  title,
  setTitle,
  content,
  setContent,
  setFiles,
}: {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  setFiles: (value: CustomFiles[]) => void;
}) => {
  const [fileData, setFileData] = useState<File[]>([]);
  const hasFile = fileData.length > 0;

  const handleDeleteFile = (fileName: string) => {
    setFileData((prevFileData) =>
      prevFileData.filter((file) => file.name !== fileName),
    );
  };

  useEffect(() => {
    const updatedFiles = fileData.map((file) => ({
      fileName: file.name,
      // TODO: file Url 데이터 추가
      fileUrl: '',
    }));
    setFiles(updatedFiles);
  }, [fileData, setFiles]);

  // console.log('file list', fileData);

  return (
    <S.PostWrapper>
      <S.TitleInput
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Line />
      <S.ContentInput
        placeholder="내용을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <S.FileUploaderWrapper>
        <FileUploader
          hasFile={hasFile}
          files={fileData}
          setFiles={setFileData}
        />
        {hasFile && (
          <ul>
            {fileData.map((file) => (
              <li key={file.name}>
                <div>
                  {file.name}
                  <S.DeleteButton
                    src={icDelte}
                    alt="delete"
                    onClick={() => handleDeleteFile(file.name)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </S.FileUploaderWrapper>
    </S.PostWrapper>
  );
};

export default PostEditor;
