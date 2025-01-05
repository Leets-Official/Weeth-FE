import styled from 'styled-components';
import theme from '../theme';

export const Wrapper = styled.div`
  width: 815px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dedede;

  &:last-child {
    margin-bottom: 15px;
  }
`;

export const SearchWrapper = styled.div`
  width: 784px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const SearchBar = styled.div`
  width: 492px;
  height: 48px;
  border: 1px solid #dedede;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: #4e4e4e;
  font-family: ${theme.font.regular};
  font-size: 18px;
  padding-left: 10px;
`;

export const EditButton = styled.div<{ isEdit: boolean }>``;

export const Edit = styled.div`
  width: 64px;
  height: 48px;
  background-color: #2f2f2f;
  color: ${theme.color.gray[100]};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const CancelButton = styled.div`
  width: 64px;
  height: 48px;
  background-color: #a6a6a6;
  color: ${theme.color.gray[100]};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SaveButton = styled.div`
  width: 64px;
  height: 48px;
  background-color: #2f2f2f;
  color: ${theme.color.gray[100]};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const UserWrapper = styled.div`
  width: 784px;
  background-color: #ffffff;
  border: 1px solid #dedede;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InfoWrapper = styled.div`
  display: flex;
  width: 157px;
  height: 48px;
  font-family: ${theme.font.semiBold};
  font-size: 18px;
`;

export const InfoBox = styled.div`
  border: 1px solid #dedede;
  width: 79px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const User = styled.div`
  width: 626px;
  height: 48px;
  border: 1px solid #dedede;
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const Attend = styled.div`
  width: 158px;
  height: 48px;
  border: 1px solid #dedede;
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MemberWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Member = styled.div`
  width: 626px;
  height: 74px;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding-left: 10px;
`;

export const UserName = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 18px;
`;

export const UserInfo = styled.div`
  font-family: ${theme.font.regular};
  font-size: 14px;
`;

export const Check = styled.div`
  width: 158px;
  height: 74px;
  border: 1px solid #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const CheckGap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const StatusWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const StatusBox = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid #dedede;
  &:last-child {
    border-right: none;
  }
`;
