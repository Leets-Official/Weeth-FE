import icClip from '@/assets/images/ic_clip.svg';
import { useRef, useState } from 'react';
import styled from 'styled-components';

export const FileButton = styled.img`
  margin-left: 20px;
  margin-right: auto;
  height: 24px;
`;

const FileUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    }
  };

  return (
    <>
      {files.length > 0 && (
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              {file.name} ({file.size} bytes)
            </li>
          ))}
        </ul>
      )}
      <FileButton src={icClip} onClick={handleClick} />
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
