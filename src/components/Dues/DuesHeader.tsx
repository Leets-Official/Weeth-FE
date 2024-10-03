import styled from 'styled-components';
import LeftButton from '@/components/Header/LeftButton';
import Title from '@/components/Header/Title';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 25px 20px 25px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

// //  해당 함수에 온클릭 이벤트 작성
// const onClickLeftButton = () => {};

const DuesHeader: React.FC = ()=> {
  return (
    <StyledHeader>
      <LeftButton />
      <TitleWrapper>
        <Title text="회비" />
      </TitleWrapper>
    </StyledHeader>
  );
};

export default DuesHeader;
