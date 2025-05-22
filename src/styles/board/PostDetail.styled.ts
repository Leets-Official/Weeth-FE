import theme from '@/styles/theme';
import styled from 'styled-components';

export const PostMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 15px 0 15px;
  word-break: break-all;
`;

export const PostMainTitleText = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 1.5rem;
`;

export const SmallText = styled.div`
  color: ${theme.color.gray[65]};
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  margin-top: 0.625rem;
  align-items: center;
`;

export const DateText = styled.div`
  margin-left: 0.625rem;
`;

export const CommentText = styled.div`
  font-size: 0.75rem;
  display: flex;
  flex-direction: row;
  line-height: 0.895rem;
  gap: 0.25rem;
  font-family: ${theme.font.semiBold};
  margin: 0.875rem 0 0.625rem 0;
`;

export const PositionIcon = styled.img`
  height: 1rem;
  width: 1rem;
  margin-right: 0.3125rem;
`;

export const PostingContianer = styled.div`
  font-size: 1rem;
  line-height: 1.1931rem;
  white-space: pre-wrap;
  margin: 1.25rem 0 1.25rem 0;

  a {
    color: ${theme.color.main};
    text-decoration: none;
  }

  a:hover {
    color: ${theme.color.mainDark};
  }
`;
