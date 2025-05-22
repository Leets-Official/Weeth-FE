import React, { useRef } from 'react';
import styled from 'styled-components';
import AddPostFile from '@/components/Board/AddPostFile';

export const FileButton = styled.img`
  cursor: pointer;
  margin-bottom: 1.25rem;
`;

const FileUploader = ({
  files,
  setFiles,
}: {
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
      setFiles([...files, ...Array.from(selectedFiles)]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <AddPostFile onClick={handleClick} />
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
