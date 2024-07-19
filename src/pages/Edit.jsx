import styled from 'styled-components';

import MyPageHeader from '../components/Header/MyPageHeader';
import InfoInput from '../components/InfoInput';
import mockUser from '../components/mockData/mockUser';

const StyledEdit = styled.div`
  width: 370px;
`;

const Cardinal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 25px 8px 25px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 75%; //피그마대로 하면 핸드폰 글자가 잘림ㅜㅜ 디자이너 컨펌 필요
  height: 45px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: #2f2f2f;
  color: white;
  padding-right: 10px;
`;

const Edit = () => {
  return (
    <StyledEdit>
      <MyPageHeader isEdit />
      <InfoInput text="이름" origValue={mockUser[0].name} />
      <InfoInput text="학번" origValue={mockUser[0].studentId} />
      <InfoInput text="학과" origValue={mockUser[0].department} />
      <InfoInput text="핸드폰" origValue={mockUser[0].tel} />
      <Cardinal>
        <div>기수</div>
        <TextBox>{mockUser[0].cardinal}</TextBox>
      </Cardinal>
      <InfoInput text="역할" origValue={mockUser[0].position} />
      <InfoInput text="메일" origValue={mockUser[0].email} />
    </StyledEdit>
  );
};

export default Edit;
