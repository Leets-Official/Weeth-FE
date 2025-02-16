import fetchAttendances from '@/api/admin/attendance/getAttendance';
import { useEffect, useState } from 'react';
import * as S from '@/styles/admin/AttendDropdown.styled';
import CheckBox from '@/assets/images/ic_admin_check.svg';
import Absence from '@/assets/images/ic_admin_absence.svg';
import updateAttendanceStatus from '@/api/admin/attendance/updateAttendanceStatus';
import RadioButton from './RadioButton';
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
  const [changedData, setChangedData] = useState<{
    [id: number]: string;
  }>({});

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

  const handleCancel = () => {
    setIsEditMode(true);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
    setChangedData((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const handleSave = async () => {
    const updates = Object.entries(changedData).map(([id, status]) => ({
      attendanceId: Number(id),
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

  const statusOptions = [
    { value: '출석', label: '출석', color: '#508FFF' },
    { value: '결석', label: '결석', color: '#FF5858' },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <S.Wrapper>
      <S.SearchWrapper>
        <S.SearchBarWrapper>
          <SearchInput searchTerm={searchTerm} onSearch={handleSearchChange} />
        </S.SearchBarWrapper>

        <S.EditButton onClick={toggleEditMode}>
          {isEditMode ? (
            <S.ButtonWrapper>
              <S.CancelButton onClick={handleCancel}>취소</S.CancelButton>
              <S.SaveButton onClick={handleSave}>저장</S.SaveButton>
            </S.ButtonWrapper>
          ) : (
            <S.Edit>수정</S.Edit>
          )}
        </S.EditButton>
      </S.SearchWrapper>
      <S.UserWrapper>
        <S.Info>
          <S.User>사용자 정보</S.User>
          {isEditMode ? (
            <S.InfoWrapper>
              <S.InfoBox>출석</S.InfoBox>
              <S.InfoBox>결석</S.InfoBox>
            </S.InfoWrapper>
          ) : (
            <S.Attend>출석 정보</S.Attend>
          )}
        </S.Info>
        {filteredData.map((item) => (
          <S.MemberWrapper key={item.id}>
            <S.Member>
              <S.UserName>{item.name}</S.UserName>
              <S.UserInfo>
                {item.position} {item.department} {item.studentId}
              </S.UserInfo>
            </S.Member>
            <S.Check>
              {isEditMode ? (
                <S.StatusWrapper>
                  {statusOptions.map((option) => (
                    <S.StatusBox key={option.value}>
                      <RadioButton
                        id={`${option.value}-${item.id}`}
                        name={`status-${item.id}`}
                        value={option.value}
                        label={option.label}
                        checked={item.status === option.value}
                        onChange={() =>
                          handleStatusChange(item.id, option.value)
                        }
                        color={option.color}
                      />
                    </S.StatusBox>
                  ))}
                </S.StatusWrapper>
              ) : (
                <S.CheckGap>
                  <img
                    src={item.status === '출석' ? CheckBox : Absence}
                    alt={item.status === '출석' ? '출석 이미지' : '결석 이미지'}
                  />
                  {item.status}
                </S.CheckGap>
              )}
            </S.Check>
          </S.MemberWrapper>
        ))}
      </S.UserWrapper>
    </S.Wrapper>
  );
};
export default AttendDropdown;
