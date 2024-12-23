import styled from 'styled-components';
import Search from '@/assets/images/ic_admin_search.svg';
import { useState } from 'react';
import theme from '@/styles/theme';

import CheckBox from '@/assets/images/ic_admin_check.svg';
import RadioButton from './RadioButton';

const Wrapper = styled.div`
  width: 815px;
  backgroun-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dedede;

  &:last-child {
    margin-bottom: 15px;
  }
`;

const SearchWrapper = styled.div`
  width: 784px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const SearchBar = styled.div`
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

const EditButton = styled.div<{ isEdit: boolean }>``;

const Edit = styled.div`
  width: 64px;
  height: 48px;
  background-color: #2f2f2f;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const CancelButton = styled.div`
  width: 64px;
  height: 48px;
  background-color: #a6a6a6;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SaveButton = styled.div`
  width: 64px;
  height: 48px;
  background-color: #2f2f2f;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UserWrapper = styled.div`
  width: 784px;
  background-color: #ffffff;
  border: 1px solid #dedede;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 157px;
  height: 48px;
  font-family: ${theme.font.semiBold};
  font-size: 18px;
`;

const InfoBox = styled.div`
  border: 1px solid #dedede;
  width: 79px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const User = styled.div`
  width: 626px;
  height: 48px;
  border: 1px solid #dedede;
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Attend = styled.div`
  width: 158px;
  height: 48px;
  border: 1px solid #dedede;
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemberWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Member = styled.div`
  width: 626px;
  height: 74px;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding-left: 10px;
`;

const UserName = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 18px;
`;

const UserInfo = styled.div`
  font-family: ${theme.font.regular};
  font-size: 14px;
`;

const Check = styled.div`
  width: 158px;
  height: 74px;
  border: 1px solid #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CheckGap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StatusWarpper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const StatusBox = styled.div`
  flex: 1;
  heigth: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid #dedede;
  &:last-child {
    border-right: none;
  }
`;

interface AttendDropdownItem {
  id: number;
  name: string;
  part: string;
  department: string;
  stdNumber: number;
  status: string;
}

const AttendDropdown: React.FC = () => {
  const [data, setData] = useState<AttendDropdownItem[]>([
    {
      id: 1,
      name: '조예진',
      part: '디자인',
      department: '시각디자인학과',
      stdNumber: 202036191,
      status: '결석',
    },
    {
      id: 2,
      name: '김지원',
      part: 'FE',
      department: '인공지능학과',
      stdNumber: 202334444,
      status: '출석',
    },
    {
      id: 3,
      name: '계다현',
      part: 'FE',
      department: '소프트웨어학과',
      stdNumber: 202344444,
      status: '출석',
    },
  ]);

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const handleStatusChange = (id: number, status: string) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  return (
    <Wrapper>
      <SearchWrapper>
        <SearchBar>
          <img src={Search} alt="search" />
          Search for name
        </SearchBar>
        <EditButton isEdit={isEditMode} onClick={toggleEditMode}>
          {isEditMode ? (
            <ButtonWrapper>
              <CancelButton>취소</CancelButton>
              <SaveButton>저장</SaveButton>
            </ButtonWrapper>
          ) : (
            <Edit>수정</Edit>
          )}
        </EditButton>
      </SearchWrapper>
      <UserWrapper>
        <Info>
          <User>사용자 정보</User>
          {isEditMode ? (
            <InfoWrapper>
              <InfoBox>출석</InfoBox>
              <InfoBox>결석</InfoBox>
            </InfoWrapper>
          ) : (
            <Attend>출석 정보</Attend>
          )}
        </Info>
        {data.map((item) => (
          <MemberWrapper>
            <Member>
              <UserName>{item.name}</UserName>
              <UserInfo>
                {item.part} {item.department} {item.stdNumber}
              </UserInfo>
            </Member>
            <Check>
              {isEditMode ? (
                <StatusWarpper>
                  <StatusBox>
                    <RadioButton
                      id={`attend-${item.id}`}
                      name={`status-${item.id}`}
                      value="출석"
                      label="출석"
                      checked={item.status === '출석'}
                      onChange={() => handleStatusChange(item.id, '출석')}
                      color="#508FFF"
                    />
                  </StatusBox>
                  <StatusBox>
                    <RadioButton
                      id={`absent-${item.id}`}
                      name={`status-${item.id}`}
                      value="결석"
                      label="결석"
                      checked={item.status === '결석'}
                      onChange={() => handleStatusChange(item.id, '결석')}
                      color="#FF5858"
                    />
                  </StatusBox>
                </StatusWarpper>
              ) : (
                <CheckGap>
                  <img src={CheckBox} alt="checkbox" />
                  {item.status}
                </CheckGap>
              )}
            </Check>
          </MemberWrapper>
        ))}
      </UserWrapper>
    </Wrapper>
  );
};
export default AttendDropdown;
