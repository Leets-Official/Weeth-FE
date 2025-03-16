import styled from 'styled-components';

export const AttendanceTable = styled.div`
  width: 95%;
  background-color: #f2f9f8;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 1px solid #dedede;
  display: flex;
  margin-left: 2.5%;
  margin-top: 15px;
  border-collapse: collapse;
  border-spacing: 0;
  cursor: pointer;

  &:last-child {
    margin-bottom: 15px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 25px 25px;
  display: flex;
  justify-content: space-between;
`;

export const DateInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DateText = styled.span`
  font-size: 20px;
  color: black;
  margin-right: 15px;
`;

export const ContentText = styled.span`
  font-size: 20px;
  color: black;
`;

export const DropdownButton = styled.img<{ isOpen: boolean }>`
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;
