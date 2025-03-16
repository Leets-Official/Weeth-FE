import theme from '@/styles/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 370px;
  margin-bottom: 50px;
`;

export const Bold = styled.div`
  font-family: ${theme.font.semiBold};
`;

export const CardinalWrapper = styled.div`
  margin-left: 30px;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const List = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 350px;
  margin: 0 10px auto;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${theme.color.gray[18]};
  font-family: ${theme.font.semiBold};
`;

export const Margin = styled.div`
  height: 20px;
  width: 350px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${theme.color.gray[18]};
`;
