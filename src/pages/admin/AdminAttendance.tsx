import NavMenu from '@/components/Admin/NavMenu';
import Cardinal from '@/components/Admin/Cardinal';
import Attendance from '@/components/Admin/Attendance';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 40px 40px;
`;

const AttendanceWrapper = styled.div`
  width: 887px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdminAttendance: React.FC = () => {
  return (
    <NavMenu>
      <Wrapper>
        <Cardinal />
        <AttendanceWrapper>
          <Attendance />
        </AttendanceWrapper>
      </Wrapper>
    </NavMenu>
  );
};
export default AdminAttendance;
