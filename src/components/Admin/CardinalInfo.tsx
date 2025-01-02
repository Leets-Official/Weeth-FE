import theme from '@/styles/theme';
import styled from 'styled-components';

export const CardinalInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardinalItems = styled.div`
  width: 200px;
  height: 150px;
  background-color: ${theme.color.gray[65]};
`;
const CardinalInfo: React.FC = () => {
  return (
    <CardinalInfoWrapper>
      <CardinalItems>기수정보</CardinalItems>
    </CardinalInfoWrapper>
  );
};
export default CardinalInfo;
