import styled from 'styled-components';

export const ListWrapper = styled.div`
  width: 100%;
  height: max-content;
  background-color: #fff;
  margin-top: 30px;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
  border-radius: 4px;
`;

const MemberListTable: React.FC = () => {
  return <ListWrapper>멤버리스트</ListWrapper>;
};

export default MemberListTable;
