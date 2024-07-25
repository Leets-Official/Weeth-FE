import styled from 'styled-components';

import MyPageHeader from '../components/MyPage/MyPageHeader';
import InfoInput from '../components/MyPage/InfoInput';
import mockUser from '../components/mockData/mockUser';

const StyledEdit = styled.div`
  width: 370px;
  padding-bottom: 183px;
`;

const InfoWrapper = styled.div`
  padding-top: 20px;
`;

const NoEdit = styled.div`
  pointer-events: none;
  touch-action: none;
`;

const Edit = () => {
  return (
    <StyledEdit>
      <MyPageHeader isEdit />
      <InfoWrapper>
        <InfoInput text="이름" origValue={mockUser[0].name} />
        <InfoInput text="학번" origValue={mockUser[0].studentId} />
        <InfoInput text="학과" origValue={mockUser[0].department} />
        <InfoInput text="핸드폰" origValue={mockUser[0].tel} />
        <NoEdit>
          <InfoInput text="기수" origValue={mockUser[0].cardinal} />
        </NoEdit>
        <InfoInput text="역할" origValue={mockUser[0].position} />
        <InfoInput text="메일" origValue={mockUser[0].email} />
      </InfoWrapper>
    </StyledEdit>
  );
};

export default Edit;
