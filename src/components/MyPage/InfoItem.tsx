import theme from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 15px 10px;
`;

const Label = styled.div`
  color: ${theme.color.gray[65]};
  width: 76px;
`;

const Info = styled.div``;

const InfoItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Info>{children}</Info>
    </Container>
  );
};

export default InfoItem;
