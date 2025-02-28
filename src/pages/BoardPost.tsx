import FileUploader from '@/components/Board/FileUploader';
import PostEditor from '@/components/Board/PostEditor';
import PostFile from '@/components/Board/PostFile';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import postBoard from '@/api/postBoard';
import { toastError, toastInfo } from '@/components/common/ToastMessage';

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
  const [files, setFiles] = useState<File[]>([]); // 실제 File 객체를 저장하는 상태

  const numericPostId = postId ? parseInt(postId, 10) : 0;

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
  }, [boardDetailInfo]);

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';

  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  // onSave에서 파일 업로드 처리
  const onSave = async () => {
    if (isTitleEmpty) {
      toastInfo('제목을 입력해주세요.');
      return;
    }
    if (isContentEmpty) {
      toastInfo('내용을 입력해주세요.');
      return;
    }
    try {
      // 서버에서 presigned URL을 받아오고, 파일 URL을 postData에 포함시켜서 게시글을 작성
      await postBoard(files, {
        title,
        content,
        files: [], // 빈 배열로 초기화 후, 실제 파일 URL 정보는 postBoard 함수 내부에서 처리됨
      });

      // 게시글 작성 후 이동
      navi(path === 'board' ? '/board' : '/notice');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      toastError('파일 업로드 중 문제가 발생했습니다.');
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

export default BoardPost;
