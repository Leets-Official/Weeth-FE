import styled from 'styled-components';
import theme from '../theme';

export const TotalDuesWrapper = styled.div`
  width: 766px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #dedede;
`;

export const TopDues = styled.div`
  width: 766px;
  height: 72px;
  border-bottom: 1px solid #dedede;
  font-size: 24px;
  font-family: ${theme.font.regular};
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  margin-left: 30px;
`;
