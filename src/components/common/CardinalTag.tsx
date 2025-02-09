import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 49px;
  height: 19px;
  border-radius: 13px;
  background-color: #fff;
  color: #000;
  font-size: 12px;
`;

const CardinalTag = ({ cardinal }: { cardinal: number }) => {
  return <Container>{cardinal}기</Container>;
};

export default CardinalTag;
