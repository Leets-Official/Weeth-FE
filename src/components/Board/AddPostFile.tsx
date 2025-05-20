import styled from 'styled-components';
import FolderImage from '@/assets/images/ic_add_folder.svg';
import theme from '@/styles/theme';

const Container = styled.div`
  width: 19.1875rem;
  height: 2.125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${theme.color.gray[30]};
  background-color: ${theme.color.gray[30]};
  border-radius: 10px;
  padding: 0 0.5rem;
  margin-bottom: 0.625rem;
`;

const FolderIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const FileName = styled.div`
  font-size: 0.875rem;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddPostFile = ({ onClick }: { onClick: () => void }) => {
  return (
    <Container onClick={onClick}>
      <FolderIcon src={FolderImage} alt="파일 폴더 아이콘" />
      <FileName>파일 추가가</FileName>
    </Container>
  );
};

export default AddPostFile;
