import icDelte from '@/assets/images/ic_delete.svg';
import Line from '@/components/common/Line';
import * as S from '@/styles/board/BoardPost.styled';
import { useState } from 'react';
import FileUploader from './FileUploader';

// TODO: 글쓰기 타입에 따라 어드민 체크
const PostEditor = ({
  title,
  setTitle,
  content,
  setContent,
}: {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const hasFile = files.length > 0;

  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  console.log('file list', files);

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
        <FileUploader hasFile={hasFile} files={files} setFiles={setFiles} />
        {hasFile && (
          <ul>
            {files.map((file) => (
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
