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
  onCommentDelete,
  onReply, // 대댓글 클릭 핸들러
}: {
  comments: CommentType[];
  path: string;
  postId: number;
  onCommentDelete: () => void;
  onReply: (commentId: number) => void; // 부모 댓글 ID를 받는 함수
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
          onDelete={onCommentDelete}
          onReply={() => onReply(comment.id)} // 부모 댓글 ID 전달
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
                onDelete={onCommentDelete}
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
