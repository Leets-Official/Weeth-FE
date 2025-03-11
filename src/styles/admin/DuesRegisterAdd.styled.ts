import styled, { css } from 'styled-components';
import DuesInput from '@/components/Admin/DuesInput';
import theme from '../theme';

export const flexMixin = (flexValue: number) => css`
  flex: ${flexValue};
`;

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  padding-bottom: 30px;
  margin-bottom: 30px;
`;

export const ModalWrapper = styled.div`
  width: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledDuesInput = styled(DuesInput)`
  width: 100%;
  padding-right: 50px;
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export const Title = styled.div`
  width: 100%;
  height: 72px;
  padding: 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-family: ${theme.font.regular};
`;

export const SubTitle = styled.div`
  font-family: ${theme.font.regular};
  font-size: 16px;
  padding: 20px 30px;
  color: black;
`;

export const CardinalWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 0 30px;
  box-sizing: border-box;
`;

export const DuesInputWrapper = styled.div`
  ${flexMixin(7)};
`;
export const DescriptionWrapper = styled.div`
  margin-left: 30px;
`;

export const FileWrapper = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
`;

export const ButtonWrapper = styled.div``;

export const SaveAddButton = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 70%;
`;

export const InputWrapper = styled.div`
  ${flexMixin(7)};
`;

export const SaveButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 6%;
  margin-top: 5%;
  gap: 5px;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
`;

export const ModalContentWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  box-sizing: border-box;
  height: calc(100% - 96px - 96px);
  color: black;
`;

export const ModalButtonWrapper = styled.div`
  gap: 10px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: 5%;
`;

export const CardinalTotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ReceiptWrapper = styled.div`
  margin-left: 30px;
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

export const ModalFileWrapper = styled.div`
  width: 294%;
`;

export const DuesWrapper = styled.div`
  margin-top: 2%;
`;
