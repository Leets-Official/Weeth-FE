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

interface PostCommentListProps {
  comments: CommentType[];
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

const PostCommentList = ({ comments }: PostCommentListProps) => {
  const renderComments = (commentList: CommentType[]) => {
    return commentList.map((comment) => (
      <div key={comment.id}>
        {/* 댓글 */}
        <Comment
          name={comment.name}
          content={comment.content}
          time={comment.time}
        />

        {/* 대댓글이 있는 경우 */}
        {comment.children && comment.children.length > 0 && (
          <ReplyWrapper>
            {comment.children.map((child) => (
              <ReplyComment
                key={child.id}
                name={child.name}
                content={child.content}
                time={child.time}
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
