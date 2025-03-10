import { styled } from 'styled-components';
import theme from '@/styles/theme';

export const DropdownContainer = styled.div`
  position: absolute;
  top: 90%;
  left: 2%;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const NoResult = styled.span`
  color: ${theme.color.gray[65]};
  text-align: center;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const DropdownItem = styled.div<{ noResult?: boolean }>`
  background-color: #f5faf9;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 70px 1fr;
  align-items: center;
  border-bottom: 1px solid #dedede;
  ${({ noResult }) =>
    noResult
      ? `
    cursor: default; 
    &:hover {
      background-color: #f5faf9; 
    }
  `
      : `
  cursor: pointer; 
  &:hover {
    background-color: #ebf5f3; 
  }
`}
`;

const DropdownText = styled.span`
  min-width: 100px;
`;

interface Member {
  id: number;
  name: string;
  cardinals: number[];
  position: string;
  department: string;
}

interface DropdownProps {
  members: Member[];
  onSelect: (name: string) => void;
}

const PenaltyMemberDropdown: React.FC<DropdownProps> = ({
  members,
  onSelect,
}) => {
  return (
    <DropdownContainer onMouseDown={(e) => e.preventDefault()}>
      {members.length === 0 ? (
        <DropdownItem noResult>
          <NoResult>검색된 멤버가 없습니다.</NoResult>
        </DropdownItem>
      ) : (
        members.map((member) => (
          <DropdownItem key={member.id} onClick={() => onSelect(member.name)}>
            <DropdownText>{member.name}</DropdownText>
            <DropdownText>{member.cardinals}</DropdownText>
            <DropdownText>{member.position}</DropdownText>
            <DropdownText>{member.department}</DropdownText>
          </DropdownItem>
        ))
      )}
    </DropdownContainer>
  );
};

export default PenaltyMemberDropdown;
