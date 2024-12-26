import Search from '@/assets/images/ic_admin_search.svg';
import { useState } from 'react';
import {
  Wrapper,
  SearchWrapper,
  SearchBar,
  EditButton,
  Edit,
  ButtonWrapper,
  CancelButton,
  SaveButton,
  UserWrapper,
  Info,
  InfoWrapper,
  InfoBox,
  User,
  Attend,
  MemberWrapper,
  Member,
  UserName,
  UserInfo,
  Check,
  CheckGap,
  StatusBox,
  StatusWrapper,
} from '@/styles/admin/AttendDropdown.styled';

import CheckBox from '@/assets/images/ic_admin_check.svg';
import Absence from '@/assets/images/ic_admin_absence.svg';
import RadioButton from './RadioButton';

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
                <StatusWrapper>
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
                </StatusWrapper>
              ) : (
                <CheckGap>
                  <img
                    src={item.status === '출석' ? CheckBox : Absence} // 조건부로 이미지 변경
                    alt={item.status === '출석' ? '출석 이미지' : '결석 이미지'}
                  />
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
