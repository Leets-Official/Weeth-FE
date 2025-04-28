import theme from '@/styles/theme';
import styled from 'styled-components';

export const CommentContainer = styled.div<{ $isSelect: boolean }>`
  width: calc(100% - 1.25rem);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0.625rem;
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
  gap: 0.3125rem;
  align-items: start;
`;

export const NameText = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 0.875rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PositionIcon = styled.img`
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.3125rem;
`;

export const ContentText = styled.div`
  font-size: 1rem;
  line-height: 1.1931rem;
  margin-top: 0.625rem;

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
  font-size: 0.75rem;
  margin-top: 0.3125rem;
`;

export const ImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const ReplyCommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.625rem 0;
  word-break: break-all;
`;

export const ReplyArrow = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.3125rem;
`;

export const ReplyContentContainer = styled.div`
  flex: 1;
  background-color: ${theme.color.gray[18]};
  border-radius: 0.5rem;
  padding: 0.625rem;
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
  top: 0.625rem;
  right: 0.625rem;
`;
