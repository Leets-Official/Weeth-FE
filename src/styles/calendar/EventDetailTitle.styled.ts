import theme from '@/styles/theme';
import styled from 'styled-components';

export const EventTitleWrapper = styled.div`
  padding: 0 15px;
  box-sizing: border-box;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 24px;
  padding-bottom: 10px;
`;

export const Writer = styled.div`
  font-size: 12px;
  color: ${theme.color.gray[65]};
`;

export const WrittenTime = styled.div`
  font-size: 12px;
  color: ${theme.color.gray[65]};
`;

export const WriteInfo = styled.div`
  display: flex;
  div {
    margin-right: 10px;
  }
`;

export const Cardinal = styled.div`
  font-size: 12px;
  color: ${theme.color.gray[65]};
  padding-right: 5px;
`;

export const TextButton = styled.div<{ $isLast?: boolean }>`
  width: calc(100% - 8px);
  box-sizing: border-box;
  padding: 12px 0 12px 16px;
  margin: 0 4px;
  border-bottom: ${(props) =>
    props.$isLast ? 'none' : `1px solid ${theme.color.gray[30]}`};
  color: ${(props) => (props.$isLast ? theme.color.negative : 'white')};
`;
