import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;
`;

export const CommentContainer = styled.div`
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
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 14px;
`;

export const ContentText = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  line-height: 19.09px;
  margin-top: 10px;
`;

export const DateText = styled.div`
  color: #c1c1c1;
  font-size: 12px;
  margin-top: 5px;
`;

export const ImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
