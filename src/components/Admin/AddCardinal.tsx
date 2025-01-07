import theme from '@/styles/theme';
import styled from 'styled-components';
import plusIcon from '@/assets/images/ic_admin_plus.svg';

export const AddCardinalWrapper = styled.div`
  width: 80px;
  height: 164px;
  background-color: ${theme.color.gray[100]};
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;
`;

// 기수 추가 모달
const onClickToAddModal = () => {};

const AddCardinal: React.FC = () => {
  return (
    <AddCardinalWrapper onClick={onClickToAddModal}>
      <img src={plusIcon} alt="plus" />
    </AddCardinalWrapper>
  );
};

export default AddCardinal;
