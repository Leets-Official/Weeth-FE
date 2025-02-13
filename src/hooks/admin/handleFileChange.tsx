import { useState } from 'react';
import {
  DescriptionWrapper,
  FileWrapper,
  ButtonWrapper,
  InputWrapper,
} from '@/styles/admin/DuesRegisterAdd.styled';
import { FileObject } from '@/types/account';
import getFileUrl from '@/api/admin/dues/upLoadFiles';
import getPresignedUrl from '@/api/admin/dues/getPresignedUrl';
import Button from '@/components/Admin/Button';
import DuesInput from '@/components/Admin/DuesInput';
import Close from '@/assets/images/ic_admin_close.svg';
import styled from 'styled-components';

interface DuesFileUploadProps {
  onFilesUploaded: (files: FileObject[]) => void;
  existingFiles?: FileObject[];
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const CloseButton = styled.div`
  display: flex;
  margin-left: 55%;
`;

const DuesFileUpload: React.FC<DuesFileUploadProps> = ({
  onFilesUploaded,
  existingFiles = [],
}) => {
  const [uploadedFiles, setUploadedFiles] =
    useState<FileObject[]>(existingFiles);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      try {
        const uploadedFileObjects: FileObject[] = await Promise.all(
          newFiles.map(async (file) => {
            const { data } = await getFileUrl(file, file.name);

            if (!data || data.length === 0 || !data[0].putUrl) {
              throw new Error('Presigned URL 요청 실패');
            }

            const { putUrl } = data[0];
            const { fileName } = data[0];

            await getPresignedUrl(putUrl, file);

            return {
              fileId: Date.now(),
              fileName,
              fileUrl: putUrl.split('?')[0],
            };
          }),
        );

        const updatedFiles = [...uploadedFiles, ...uploadedFileObjects];
        setUploadedFiles(updatedFiles);
        onFilesUploaded(updatedFiles);
      } catch (error) {
        console.error('파일 업로드 실패:', error);
      }
    }
  };

  const handleRemoveFile = (fileName: string) => {
    const filteredFiles = uploadedFiles.filter(
      (file) => file.fileName !== fileName,
    );
    setUploadedFiles(filteredFiles);
    onFilesUploaded(filteredFiles);
  };

  return (
    <DescriptionWrapper>
      <FileWrapper>
        <ButtonWrapper>
          <input
            id="file-upload"
            type="file"
            accept="image/*,application/pdf"
            style={{ display: 'none' }}
            multiple
            onChange={handleFileChange}
          />
          <Button
            description="파일 선택"
            color="#00dda8"
            width="99px"
            onClick={() => document.getElementById('file-upload')?.click()}
          />
        </ButtonWrapper>

        <InputWrapper>
          {uploadedFiles.length === 0 ? (
            <DuesInput width="90%" placeholder="선택된 파일 없음" readOnly />
          ) : (
            uploadedFiles.map((file) => (
              <Wrapper key={file.fileName}>
                <DuesInput width="270%" placeholder={file.fileName} readOnly />
                <CloseButton
                  onClick={() => handleRemoveFile(file.fileName)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <img src={Close} alt="삭제" width="20px" />
                </CloseButton>
              </Wrapper>
            ))
          )}
        </InputWrapper>
      </FileWrapper>
    </DescriptionWrapper>
  );
};

export default DuesFileUpload;
