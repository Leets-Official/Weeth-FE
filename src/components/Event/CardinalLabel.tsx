import theme from '@/styles/theme';
import styled from 'styled-components';
// import close from '@/assets/images/ic_close.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 76px;
  height: 30px;
  border-radius: 29px;
  box-sizing: border-box;
  border: 1px solid ${theme.color.gray[30]};
  font-size: 14px;
  font-family: ${theme.font.semiBold};
`;

// const DeleteButton = styled.img`
//   width: 14px;
//   cursor: pointer;
// `;

const CardinalLabel = ({
  cardinal,
  // onDelete,
}: {
  cardinal: number;
  // onDelete: (val: number) => void;
}) => {
  return (
    <Container>
      {cardinal}기
      {/* TODO: 여러 기수 선택하도록 확장 후 추가 예정
      <DeleteButton
        src={close}
        alt="close"
        onClick={() => {
          onDelete(cardinal);
        }}
      /> */}
    </Container>
  );
};

export default CardinalLabel;
