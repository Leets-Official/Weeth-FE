import styled from 'styled-components';
import Close from '@/assets/images/ic_admin_close.svg';
import { FileObject } from '@/types/account';

interface ReceiptModalProps {
  fileUrls: FileObject[];
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  width: 90%;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const ReceiptModal: React.FC<ReceiptModalProps> = ({ fileUrls, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={onClose}>
            <img src={Close} alt="닫기" />
          </CloseButton>
        </Header>
        {fileUrls.map((file) => (
          <div key={file.fileId}>
            <img src={file.fileUrl} alt={file.fileName} width="50%" />
          </div>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReceiptModal;
