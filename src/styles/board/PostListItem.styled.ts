import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.625rem 0;
  cursor: pointer;
`;

export const PostLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PostRightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3125rem 0.3125rem 0 0;
`;

export const TitleText = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 1rem;
  line-height: 1.4;
  margin-bottom: 0.375rem;
  width: 20.3125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Divider = styled.span`
  color: ${theme.color.gray[30]};
  font-size: 0.75rem;
`;

export const ContentText = styled.div`
  color: ${theme.color.gray[65]};
  font-size: 0.875rem;
  line-height: 1.5;
  width: 20.3125rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const LightText = styled.div`
  color: ${theme.color.gray[65]};
  font-size: 0.75rem;
`;

export const CommentsText = styled(LightText)`
  margin-left: 0.1875rem;
`;

export const DateText = styled(LightText)`
  margin-top: 0.125rem;
  line-height: 0.9rem;
`;

export const NameText = styled(LightText)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const ImgContainer = styled.img`
  height: 0.75rem;
  width: 0.75rem;
  filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(187%)
    hue-rotate(0deg) brightness(92%) contrast(92%);
`;

export const FileIcon = styled.img`
  height: 0.75rem;
`;

export const PositionIcon = styled.img`
  height: 1rem;
  width: 1rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3125rem;
  gap: 0.3125rem;
`;

export const BottomInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.375rem;
  margin-top: 0.3125rem;
  width: 100%;
`;
