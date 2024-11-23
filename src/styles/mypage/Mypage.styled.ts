import theme from '@/styles/theme';
import styled from 'styled-components';

export const StyledDetails = styled.div`
  width: 370px;
  padding-bottom: 50px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

export const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 25px 0px 0px;
  cursor: pointer;
`;

export const Account = styled.div`
  display: flex;
  flex-direction: row;
  padding: 94px 25px 0px 25px;
`;

export const LeaveButton = styled.button`
  width: 96px;
  height: 45px;
  border: none;
  border-radius: 10px;
  color: ${theme.color.grayScale.gray65};
  background-color: ${theme.color.grayScale.gray18};
  font-family: ${theme.font.family.pretendard_regular};
  margin-right: 5px;
`;

export const LogoutButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 219px;
  height: 45px;
  margin-left: 5px;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: ${theme.color.grayScale.gray30};
  font-family: ${theme.font.family.pretendard_regular};
  cursor: pointer;
`;
