import styled from 'styled-components';
import theme from '../theme';

export const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #dedede;
`;

export const DateWrapper = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: space-between;
  font-family: ${theme.font.regular};
  font-size: 18px;
  align-items: center;
`;

export const Date = styled.div`
  margin-left: 15px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const ExpenditureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export const ExpenditureTitle = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Master = styled.div`
  margin-top: 20px;
`;

export const ExpenditureMaster = styled.div`
  font-family: ${theme.font.regular};
  font-size: 18px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

export const ModifyButton = styled.div``;
