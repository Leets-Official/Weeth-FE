import theme from '@/styles/theme';
import styled from 'styled-components';

// Comment.tsx
export const CommentContainer = styled.div<{ $isSelect: boolean }>`
  width: calc(100% - 20px);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px;
  background-color: ${(props) =>
    props.$isSelect ? '#508FFF1A' : 'transparent'};
  transition: background-color 0.3s ease;
  word-break: break-all;
`;

export const CommentContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: start;
`;

export const NameText = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PositionIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

export const ContentText = styled.div`
  font-size: 16px;
  line-height: 19.09px;
  margin-top: 10px;

  a {
    color: ${theme.color.main};
    text-decoration: none;
  }

  a:hover {
    color: ${theme.color.mainDark};
  }
`;

export const DateText = styled.div`
  color: ${theme.color.gray[65]};
  font-size: 12px;
  margin-top: 5px;
`;

export const ImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

// ReplyComment.tsx
export const ReplyCommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 0;
  word-break: break-all;
`;

export const ReplyArrow = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export const ReplyContentContainer = styled.div`
  flex: 1;
  background-color: ${theme.color.gray[18]};
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ReplyImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
