import styled from 'styled-components';
import Comment from '@/components/Board/Comment';
import ReplyComment from './ReplyComment';

interface CommentType {
  id: number;
  name: string;
  content: string;
  time: string;
  children?: CommentType[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 23px 0 23px;
`;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostCommentList = ({
  comments,
  path,
  postId,
  onCommentDelete, // 삭제 핸들러 전달받음
}: {
  comments: CommentType[];
  path: string;
  postId: number;
  onCommentDelete: () => void; // 삭제 후 갱신 핸들러 타입
}) => {
  const renderComments = (commentList: CommentType[]) => {
    return commentList.map((comment) => (
      <div key={comment.id}>
        <Comment
          name={comment.name}
          content={comment.content}
          time={comment.time}
          postId={postId}
          commentId={comment.id}
          path={path}
          onDelete={onCommentDelete} // 삭제 핸들러 전달
        />

        {comment.children && comment.children.length > 0 && (
          <ReplyWrapper>
            {comment.children.map((child) => (
              <ReplyComment
                key={child.id}
                postId={postId}
                commentId={child.id}
                name={child.name}
                content={child.content}
                time={child.time}
                path={path}
                onDelete={onCommentDelete} // 대댓글 삭제 핸들러 전달
              />
            ))}
          </ReplyWrapper>
        )}
      </div>
    ));
  };

  return <Container>{renderComments(comments)}</Container>;
};

export default PostCommentList;
