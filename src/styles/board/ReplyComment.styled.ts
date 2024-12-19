import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 0;
`;

export const ReplyArrow = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export const ReplyContainer = styled.div`
  flex: 1;
  background-color: #2f2f2f;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
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
  position: absolute;
  top: 10px;
  right: 10px;
`;
