import styled from 'styled-components';
import { flexMixin } from './DuesRegisterAdd.styled';

export const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  box-sizing: border-box;
  border-top: 1px solid #dedede;
`;

export const Title = styled.div`
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const CardinalWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

export const DuesInputWrapper = styled.div`
  ${flexMixin(7)};
`;

export const DescriptionWrapper = styled.div`
  margin-top: 30px;
`;

export const Description = styled.div`
  color: red;
  font-size: 18px;
  margin-left: 100px;
  margin-top: 15px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

export const ButtonWrapperWithDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
`;
