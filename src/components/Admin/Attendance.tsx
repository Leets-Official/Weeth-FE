import { useEffect, useState } from 'react';
import {
  AttendanceTable,
  Wrapper,
  DateInfoWrapper,
  DateText,
  ContentText,
  DropdownButton,
} from '@/styles/admin/Attendance.styled';
import DropDown from '@/assets/images/ic_admin_cardinal.svg';
import fetchAttendancesByCardinal from '@/api/admin/attendance/fetchAttendancesByCardinal';
import dayjs from 'dayjs';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import AttendDropdown from '@/components/Admin/AttendDropdown';

interface AttendanceItem {
  id: number;
  title: string;
  content: string;
  start: string;
}

interface AttendanceProps {
  selectedCardinal: number | null;
}

const Attendance: React.FC<AttendanceProps> = ({ selectedCardinal }) => {
  const [data, setData] = useState<AttendanceItem[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const { isAdmin } = useGetGlobaluserInfo();

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY년 M월 D일');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      const res = await fetchAttendancesByCardinal(selectedCardinal);

      if (res.code === 200) {
        setData(res.data);
      }
    };
    fetchData();
  }, [selectedCardinal, isAdmin]);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {data.map((item) => (
        <div key={item.id}>
          <AttendanceTable onClick={() => toggleDropdown(item.id)}>
            <Wrapper>
              <div>
                <DateInfoWrapper>
                  <DateText>{formatDate(item.start)}</DateText>
                  <ContentText>
                    {item.content} {item.title}
                  </ContentText>
                </DateInfoWrapper>
              </div>
              <DropdownButton
                src={DropDown}
                alt="dropdown"
                isOpen={openDropdownId === item.id}
              />
            </Wrapper>
          </AttendanceTable>
          {openDropdownId === item.id && <AttendDropdown meetingId={item.id} />}
        </div>
      ))}
    </>
  );
};

export default Attendance;
