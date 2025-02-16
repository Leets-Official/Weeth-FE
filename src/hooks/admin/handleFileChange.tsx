import { useState } from 'react';
import { FileObject } from '@/types/account';
import getFileUrl from '@/api/admin/dues/upLoadFiles';
import getPresignedUrl from '@/api/admin/dues/getPresignedUrl';

const useDuesFileUpload = (existingFiles: FileObject[] = []) => {
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
              fileName,
              fileUrl: putUrl.split('?')[0],
            };
          }),
        );
        const updatedFiles = [...uploadedFiles, ...uploadedFileObjects];
        setUploadedFiles(updatedFiles);
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
  };

  return {
    uploadedFiles,
    setUploadedFiles,
    handleFileChange,
    handleRemoveFile,
  };
};

export default useDuesFileUpload;
