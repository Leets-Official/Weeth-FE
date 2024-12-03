import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
`;

export const PostLeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostRightSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

export const TitleText = styled.div`
  color: ${theme.color.gray[100]};
  font-family: ${theme.font.semiBold};
  font-size: 16px;
  line-height: 19.09px;
  margin: 5px 0;
`;

export const ContentText = styled.div`
  color: ${theme.color.gray[100]};
  font-family: ${theme.font.regular};
  font-size: 14px;
  line-height: 19.09px;
`;

export const LightText = styled.div`
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.regular};
  font-size: 12px;
  line-height: 14.32px;
`;

export const CommentsText = styled(LightText)`
  margin-left: 5px;
`;
export const DateText = styled(LightText)`
  margin-left: auto;
`;
export const NameText = styled(LightText)`
  margin-top: 5px;
`;

export const ImgContainer = styled.img`
  height: 12px;
  width: 12px;
`;
