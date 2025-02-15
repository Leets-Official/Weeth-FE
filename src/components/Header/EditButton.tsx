import icEdit from '@/assets/images/ic_edit.svg';
import styled from 'styled-components';

const ImgButton = styled.img`
  cursor: pointer;
`;

const EditButton = ({ onClick }: { onClick: () => void }) => {
  return <ImgButton src={icEdit} alt="edit" onClick={onClick} />;
};

export default EditButton;
