import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 370px;
  padding-bottom: 50px;
  font-size: 16px;
`;

export const TextButton = styled.div<{ isSignOut?: boolean }>`
  width: calc(100% - 8px);
  box-sizing: border-box;
  padding: 12px 0 12px 16px;
  margin: 0 4px;
  border-bottom: ${(props) =>
    props.isSignOut ? 'none' : `1px solid ${theme.color.gray[30]}`};
  color: ${(props) => (props.isSignOut ? theme.color.negative : 'white')};
  cursor: pointer;
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
  color: ${theme.color.gray[65]};
  background-color: ${theme.color.gray[18]};
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
  background-color: ${theme.color.gray[30]};
  cursor: pointer;
`;
