import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.color.gray[20]};
  }
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
  gap: 4px;
`;

export const TitleText = styled.div`
  color: whi
  font-family: ${theme.font.semiBold};
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 6px;
`;

export const Divider = styled.span`
  color: ${theme.color.gray[65]};
  font-size: 12px;
`;

export const ContentText = styled.div`
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.regular};
  font-size: 14px;
  line-height: 1.5;
`;

export const LightText = styled.div`
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.regular};
  font-size: 12px;
`;

export const CommentsText = styled(LightText)`
  margin-left: 4px;
`;

export const DateText = styled(LightText)`
  margin-top: 2px;
`;

export const NameText = styled(LightText)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ImgContainer = styled.img`
  height: 14px;
  width: 14px;
`;

export const FileIcon = styled.img`
  height: 14px;
  width: 14px;
  margin-left: 5px;
`;

export const PositionIcon = styled.img`
  height: 20px;
  width: 20px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 6px;
`;
export const BottomInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-top: 5px;
  width: 100%;
`;
