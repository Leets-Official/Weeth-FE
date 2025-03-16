import theme from '@/styles/theme';
import styled from 'styled-components';

export const Line = styled.div`
  border: 1px solid #4d4d4d;
  width: 285px;
  margin: 0 auto;
`;

export const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13px;
  font-size: 16px;
`;

export const ModalInput = styled.input`
  width: 285px;
  height: 45px;
  margin: 0 auto;
  padding: 13px;
  margin: 15px auto;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: ${theme.color.gray[12]};
  color: ${theme.color.gray[100]};
  font-size: 16px;
  box-sizing: border-box;
  font-family: ${theme.font.regular};
  &::placeholder {
    color: ${theme.color.gray[65]};
    font-family: ${theme.font.regular};
    font-size: 16px;
  }
`;

export const SemiBoldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  font-family: ${theme.font.semiBold};
  font-size: 16px;
  gap: 20px;
`;

export const RegularConatiner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0 30px 0;
  font-family: ${theme.font.regular};
  font-size: 14px;
  gap: 8px;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Highlight = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 20px;
  color: ${theme.color.main};
  margin-bottom: 5px;
`;
