import { useState } from 'react';
import {
  AttendanceTable,
  Wrapper,
  DateInfoWrapper,
  DateText,
  ContentText,
  Button,
} from '@/styles/admin/Attendance.styled';

import DropDown from '@/assets/images/ic_admin_cardinal.svg';
import AttendDropdown from './AttendDropdown';

interface AttendanceItem {
  id: number;
  title: string;
  content: string;
  start: string;
}

const Attendance: React.FC = () => {
  const [data] = useState<AttendanceItem[]>([
    {
      id: 1,
      title: '정기모임',
      content: '1주차',
      start: '2024-08-01',
    },
    {
      id: 2,
      title: '정기모임',
      content: '2주차',
      start: '2024-08-02',
    },
    {
      id: 3,
      title: '정기모임',
      content: '3주차',
      start: '2024-08-03',
    },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {data.map((item) => (
        <div key={item.id}>
          <AttendanceTable>
            <Wrapper>
              <div>
                <DateInfoWrapper>
                  <DateText>{item.start}</DateText>
                  <ContentText>
                    {item.content} {item.title}
                  </ContentText>
                </DateInfoWrapper>
              </div>
              <Button onClick={() => toggleDropdown(item.id)}>
                <img src={DropDown} alt="dropdown" />
              </Button>
            </Wrapper>
          </AttendanceTable>
          {openDropdownId === item.id && <AttendDropdown />}
        </div>
      ))}
    </>
  );
};

export default Attendance;
