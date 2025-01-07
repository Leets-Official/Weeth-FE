import icClip from '@/assets/images/ic_clip.svg';
import React, { useRef } from 'react';
import styled from 'styled-components';

export const FileButton = styled.img`
  cursor: pointer;
  margin-bottom: 20px;
`;

const FileUploader = ({
  hasFile,
  files,
  setFiles,
}: {
  hasFile: boolean;
  files: File[];
  setFiles: (value: File[]) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      let isUnique = true;
      Array.from(selectedFiles).forEach((newFile) => {
        if (files.some((file) => file.name === newFile.name)) {
          isUnique = false;
        }
      });
      if (isUnique) setFiles([...files, ...Array.from(selectedFiles)]);
    }
  };

  return (
    <>
      <FileButton
        src={icClip}
        onClick={handleClick}
        alt={hasFile ? '파일 있음' : '파일 없음'}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
    </>
  );
};

export default FileUploader;
