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
  padding-top: 5px;
  color: ${theme.color.gray[65]};
  text-align: center;
`;

const DropdownItem = styled.div`
  background-color: #f5faf9;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 70px 1fr;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #ebf5f3;
  }
  border-bottom: 1px solid #dedede;
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
  if (members.length === 0) {
    return <NoResult>검색된 멤버가 없습니다.</NoResult>;
  }

  return (
    <DropdownContainer onMouseDown={(e) => e.preventDefault()}>
      {members.map((member) => (
        <DropdownItem key={member.id} onClick={() => onSelect(member.name)}>
          <DropdownText>{member.name}</DropdownText>
          <DropdownText>{member.cardinals}</DropdownText>
          <DropdownText>{member.position}</DropdownText>
          <DropdownText>{member.department}</DropdownText>
        </DropdownItem>
      ))}
    </DropdownContainer>
  );
};

export default PenaltyMemberDropdown;
