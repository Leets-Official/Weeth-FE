/* eslint-disable react/require-default-props */
import styled from 'styled-components';

import LeftButton from '@/components/Header/LeftButton';
import Title from '@/components/Header/Title';
import TextButton from '@/components/Header/TextButton';

/* eslint-disable no-alert */

interface MyPageHeaderProps {
  isEdit: boolean;
  onSave?: () => void;
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const MyPageHeader: React.FC<MyPageHeaderProps> = ({ isEdit, onSave }) => {
  return (
    <StyledHeader>
      <LeftButton />
      <TitleWrapper>
        <Title text="My" />
      </TitleWrapper>
      {isEdit ? (
        <TextButton text="완료" color="mainColor" onClick={onSave} />
      ) : null}
    </StyledHeader>
  );
};

export default MyPageHeader;
