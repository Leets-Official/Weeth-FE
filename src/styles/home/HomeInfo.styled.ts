import styled from 'styled-components';
import theme from '@/styles/theme';

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 94%;
  margin: 15px 0 0 5%;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 32px;
  font-weight: bold;
  gap: 10px;
  align-self: flex-end;
`;

export const NickNameContainer = styled.div`
  font-size: 14px;
  font-family: ${theme.font.regular};
  margin-left: 8px;
  align-self: flex-end;
  padding-bottom: 5px;
`;

export const RightButtonContainer = styled.div`
  display: flex;
  padding-bottom: 5px;
  align-items: center;
  align-self: flex-end;
  margin-right: 10px;
`;

export const UserCharacter = styled.img`
  width: 153px;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.08);
  }
`;

export const LoadingContainer = styled.div`
  width: 153px;
  height: 140px;
`;

export const Admin = styled.img`
  margin-bottom: -1.5px;
`;
