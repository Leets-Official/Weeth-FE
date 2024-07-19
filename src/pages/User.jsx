import styled from 'styled-components';
import UserHeader from '../components/Header/UserHeader';
import Generation from '../components/Header/Generation';
import UserName from '../components/UserName';

const StyledMember = styled.div`
  width: 370px;
`;

const MemberList = styled.div`
  position: absolute;
  background-color: #2e2e2e;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 100%;
`;

const mockUser = [
  {
    name: '이강혁',
    studentId: '1234567',
    tel: '01012345678',
    department: 'SW',
    email: '123@123.123',
    cardinal: 1,
    position: 'BE',
  },
  {
    name: '박예진',
    studentId: '1234567',
    tel: '01012345678',
    department: 'SW',
    email: '123@123.123',
    cardinal: 2,
    position: 'FE',
  },
  {
    name: '조예진',
    studentId: '1234567',
    tel: '01012345678',
    department: 'SW',
    email: '123@123.123',
    cardinal: 3,
    position: 'D',
  },
  {
    name: '김성민',
    studentId: '1234567',
    tel: '01012345678',
    department: 'SW',
    email: '123@123.123',
    cardinal: 3,
    position: 'MA',
  },
];

const Member = () => {
  return (
    <StyledMember>
      <UserHeader mockUser={mockUser} />
      <Generation />
      <MemberList>
        {mockUser.map((user) => (
          <UserName
            name={user.name}
            cardinal={user.cardinal}
            position={user.position}
          />
        ))}
      </MemberList>
    </StyledMember>
  );
};

export default Member;
