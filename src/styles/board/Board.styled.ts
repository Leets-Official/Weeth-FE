import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.125rem;
  max-width: 23.125rem;
  margin-bottom: 3.125rem;
`;

export const NoticeTextContainer = styled.div`
  margin: 0.625rem 1.5625rem 0.625rem 0.9375rem;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
`;

export const NoticeTitleText = styled.div`
  font-size: 1rem;
  font-family: ${theme.font.semiBold};
  line-height: 1.2rem;
`;

export const AllText = styled.div`
  font-size: 0.75rem;
  color: ${theme.color.gray[65]};
  cursor: pointer;
  margin-top: 0.1875rem;
`;

export const ScrollContainer = styled.div`
  display: flex;
  margin-left: 0.9375rem;
  overflow-x: auto;
  gap: 0.625rem;
  cursor: grab;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background: ${theme.color.gray[65]};
  }
`;

export const NoticeCard = styled.div`
  flex: 0 0 auto;
  background-color: ${theme.color.gray[30]};
  color: white;
  font-family: ${theme.font.semiBold};
  border-radius: 0.625rem;
  width: 13.25rem;
  height: 3.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.4;

  &:nth-child(1) {
    background-color: ${theme.color.mainMiddle};
    color: white;
  }

  &:hover {
    filter: brightness(1.2);
  }

  transition: filter 0.2s ease-in-out;
`;

export const NoticeTitle = styled.div`
  font-size: 0.75rem;
  font-family: ${theme.font.semiBold};
  line-height: 0.9rem;
  margin: 0.9375rem 1.3125rem 0 0.9375rem;
`;

export const NoticeContent = styled.p`
  font-size: 0.625rem;
  color: ${theme.color.gray[65]};
  margin: 0.3125rem 1.5625rem 0.8125rem 0.9375rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TabContainerWrapper = styled.div`
  display: flex;
  align-items: start;
  margin: 1.875rem 1.5625rem 0.625rem 0.9375rem;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const TabText = styled.div`
  font-size: 1rem;
  color: white;
  font-family: ${theme.font.semiBold};
`;

export const Underline = styled.div`
  width: 5.625rem;
  height: 0.125rem;
  background-color: ${theme.color.main};
  margin-top: 0.3125rem;
`;

export const PostListContainer = styled.div`
  margin: 0 0.46875rem;
`;

export const PostListItemContainer = styled.div`
  padding: 0 0.3125rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.color.gray[20]};
  }
`;

export const Line = styled.div`
  border: 1px solid;
  margin: 0 0.3125rem;
  color: ${(props) => props.theme.color.gray[18]};
`;

export const Text = styled.div`
  text-align: center;
  margin: 0.625rem;
  font-family: ${theme.font.semiBold};
`;

export const PostingButtonContainer = styled.div`
  position: fixed;
  display: flex;
  bottom: 0.9375rem;
  justify-content: end;
  width: 100%;
  max-width: 23.4375rem;
  z-index: 10;
`;
