import styled from 'styled-components';
import theme from '@/styles/theme';
import DownButton from '@/assets/images/ic_admin_cardinal.svg';

const Wrapper = styled.div`
  width: 90%;
  height: 72px;
  margin-top: 50px;
  background-color: #fff;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  font-family: ${theme.font.semiBold};
`;

const DuesReigster: React.FC = () => {
  return (
    <Wrapper>
      <Title>
        총 회비 최초 등록
        <img src={DownButton} alt="DownButton" />
      </Title>
    </Wrapper>
  );
};

export default DuesReigster;
