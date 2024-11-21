import styled from 'styled-components';
import theme from '../theme';

export const EventAdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  padding-bottom: 183px;
  font-family: ${theme.font.family.pretendard_regular};
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;
