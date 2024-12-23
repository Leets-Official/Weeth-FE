import { useState } from 'react';
import styled from 'styled-components';

import theme from '@/styles/theme';
import DropDown from '@/assets/images/ic_admin_cardinal.svg';
import AttendDropdown from './AttendDropdown';

interface AttendanceItem {
  id: number;
  title: string;
  content: string;
  start: string;
}

const AttendanceTable = styled.div`
  width: 815px;
  background-color: #f2f9f8;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-bottom: 1px solid #dedede;

  &:last-child {
    margin-bottom: 15px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 25px 25px;
  display: flex;
  justify-content: space-between;
`;

const DateInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DateText = styled.span`
  font-family: ${theme.font.regular};
  font-size: 20px;
  color: black;
  margin-right: 15px;
`;

const ContentText = styled.span`
  font-family: ${theme.font.regular};
  font-size: 20px;
  color: black;
`;

const Button = styled.div``;

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
