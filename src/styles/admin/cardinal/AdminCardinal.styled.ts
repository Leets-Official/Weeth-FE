import theme from '@/styles/theme';
import { styled } from 'styled-components';

export const ModalContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  box-sizing: border-box;
  width: calc(100% - 40px);
  max-width: 360px;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  color: ${theme.color.negative};
  font-size: 14px;
`;

export const StyledInput = styled.input<{ flex: number; maxWidth: string }>`
  flex: ${({ flex }) => flex};
  max-width: ${({ maxWidth }) => maxWidth};
  font-family: ${theme.font.semiBold};
  border: 1px solid #dedede;
  border-radius: 4px;
  font-size: 16px;
  padding: 12px;

  &::placeholder {
    color: ${theme.color.gray[65]};
  }
`;
