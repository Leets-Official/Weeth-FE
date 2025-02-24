import styled from 'styled-components';
import theme from '../theme';

export const Wrapper = styled.div`
  width: 95%;
  margin-left: 2.5%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
  border-bottom: 1px solid #dedede;

  &:last-child {
    margin-bottom: 15px;
  }
`;

export const SearchWrapper = styled.div`
  width: 98%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  box-sizing: border-box;
  padding: 15px 15px;
`;

export const SearchBar = styled.div`
  width: 70%;
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

export const EditButton = styled.button`
  background-color: white;
  border: none;
  font-size: 18px;
`;

export const Edit = styled.div`
  width: 64px;
  height: 48px;
  background-color: #2f2f2f;
  color: ${theme.color.gray[100]};
  font-size: 18px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: ${theme.font.regular};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const CancelButton = styled.div`
  width: 64px;
  height: 48px;
  background-color: #a6a6a6;
  font-family: ${theme.font.regular};

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
  font-size: 18px;
  font-family: ${theme.font.regular};
`;

export const UserWrapper = styled.div`
  width: 95%;
  background-color: #ffffff;
  border: 1px solid #dedede;
  margin-top: 15px;
  margin-bottom: 15px;
  border-collapse: collapse;
  border-spacing: 0;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InfoWrapper = styled.div`
  display: flex;
  width: 162px;
  height: 48px;
  font-family: ${theme.font.semiBold};
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 18px;
`;

export const InfoBox = styled.div`
  border-left: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  width: 79px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const User = styled.div`
  width: 626px;
  height: 48px;
  border-bottom: 1px solid #dedede;
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const Attend = styled.div`
  width: 160px;
  height: 48px;
  border-left: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MemberWrapper = styled.div`
  display: flex;
  width: 100%;

  &:last-child {
    & > div {
      border-bottom: none;
    }
  }
`;

export const Member = styled.div`
  width: 626px;
  height: 74px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding-left: 10px;
  border-bottom: 1px solid #dedede;
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
  width: 160px;
  height: 74px;
  border-bottom: 1px solid #dedede;
  border-left: 1px solid #dedede;
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
  width: 159px;
  height: 100%;
`;

export const StatusBox = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #dedede;
  &:last-child {
    border-right: none;
    border-bottom: none;
  }
`;

export const SearchBarWrapper = styled.div`
  width: 60%;
`;
