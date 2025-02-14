import fetchAttendances from '@/api/admin/attendance/attendance';
import { useEffect, useState } from 'react';
import {
  Wrapper,
  SearchWrapper,
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
  SearchBarWrapper,
} from '@/styles/admin/AttendDropdown.styled';
import CheckBox from '@/assets/images/ic_admin_check.svg';
import Absence from '@/assets/images/ic_admin_absence.svg';
import updateAttendanceStatus from '@/api/admin/attendance/updateAttendanceStatus';
import RadioButton from './RadioButton';
import { MemberProvider } from './context/MemberContext';
import SearchInput from './SearchInput';

interface AttendDropdownItem {
  id: number;
  name: string;
  position: string;
  department: string;
  studentId: string;
  status: string;
}

interface AttendDropdownProps {
  meetingId: number;
}

const formatStatus = (status: string) => {
  return status === 'ATTEND' ? '출석' : '결석';
};

const formatStatusForAPI = (status: string) => {
  return status === '출석' ? 'ATTEND' : 'PENDING';
};

const AttendDropdown: React.FC<AttendDropdownProps> = ({ meetingId }) => {
  const [data, setData] = useState<AttendDropdownItem[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadAttendances = async () => {
      const res = await fetchAttendances(meetingId);

      if (res.code === 200) {
        const formattedData = res.data.map((item: any) => ({
          ...item,
          status: formatStatus(item.status),
        }));
        setData(formattedData);
      }
    };
    if (meetingId) {
      loadAttendances();
    }
  }, [meetingId]);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const handleStatusChange = (id: number, newStatus: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  };

  const handleCancel = () => {
    setIsEditMode(true);
  };

  const handleSave = async () => {
    const updates = data.map(({ id, status }) => ({
      attendanceId: id,
      status: formatStatusForAPI(status),
    }));

    const res = await updateAttendanceStatus(updates);

    if (res.code === 200) {
      alert('출석 상태가 성공적으로 업데이트되었습니다.');
      setIsEditMode(false);
    } else {
      alert('출석 상태 업데이트에 실패했습니다.');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <MemberProvider>
      <Wrapper>
        <SearchWrapper>
          <SearchBarWrapper>
            <SearchInput
              searchTerm={searchTerm}
              onSearch={handleSearchChange}
            />
          </SearchBarWrapper>

          <EditButton isEdit={isEditMode} onClick={toggleEditMode}>
            {isEditMode ? (
              <ButtonWrapper>
                <CancelButton onClick={handleCancel}>취소</CancelButton>
                <SaveButton onClick={handleSave}>저장</SaveButton>
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
          {filteredData.map((item) => (
            <MemberWrapper>
              <Member>
                <UserName>{item.name}</UserName>
                <UserInfo>
                  {item.position} {item.department} {item.studentId}
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
                      src={item.status === '출석' ? CheckBox : Absence}
                      alt={
                        item.status === '출석' ? '출석 이미지' : '결석 이미지'
                      }
                    />
                    {item.status}
                  </CheckGap>
                )}
              </Check>
            </MemberWrapper>
          ))}
        </UserWrapper>
      </Wrapper>
    </MemberProvider>
  );
};
export default AttendDropdown;
