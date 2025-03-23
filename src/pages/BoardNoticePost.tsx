import FileUploader from '@/components/Board/FileUploader';
import PostEditor from '@/components/Board/PostEditor';
import PostFile from '@/components/Board/PostFile';
import Header from '@/components/Header/Header';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import postBoardNotice from '@/api/postBoardNotice';
import { toastError, toastInfo } from '@/components/common/ToastMessage';
import Loading from '@/components/common/Loading';

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

const BoardNoticePost = () => {
  const navi = useNavigate();
  const { postId } = useParams();

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const numericPostId = postId ? parseInt(postId, 10) : 0;

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';

  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  // onSave에서 파일 업로드 처리
  const onSave = async () => {
    setLoading(true);
    if (isTitleEmpty) {
      toastInfo('제목을 입력해주세요.');
      setLoading(false);
      return;
    }
    if (isContentEmpty) {
      toastInfo('내용을 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      // 요청 타입 결정
      const postType = path === 'board' ? 'postBoard' : 'postNotice';

      if (title.length > 255) {
        toastError('제목을 255자 이내로 작성해주세요.');
        return;
      }

      if (content.length > 65000) {
        toastError('내용을 65,000자 이내로 작성해주세요.');
        return;
      }

      // 서버 요청
      await postBoardNotice({
        files,
        postData: {
          title,
          content,
          files: [],
        },
        postType,
        id: numericPostId,
      });

      // 게시글 생성 후 이동
      navi(path === 'board' ? '/board' : '/notice');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toastError(
        path === 'board'
          ? '게시글 작성 중 문제가 발생했습니다.'
          : '공지사항 작성 중 문제가 발생했습니다.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostWrapper>
      {loading && <Loading />}
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
        <FileUploader files={files} setFiles={setFiles} />
        {files.length > 0 && (
          <>
            {files.map((file) => (
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

export default BoardNoticePost;
