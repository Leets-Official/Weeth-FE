import icClip from '@/assets/images/ic_clip.svg';
import styled from 'styled-components';

export const FileButton = styled.img`
  margin-left: 20px;
  margin-right: auto;
  height: 24px;
`;

const FileUploader = () => {
  return <FileButton src={icClip} />;
};

export default FileUploader;
