import { MemberData } from '@/components/Admin/context/MemberContext';
import theme from '@/styles/theme';
import Modal from 'react-modal';
import { styled } from 'styled-components';

interface MemberDetailModalProps {
  data: MemberData;
  onClose: () => void;
}

const ModalContent = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 400px;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
  color: #000;
`;

const Title = styled.div`
  background-color: #f2f9f8;
  font-family: ${theme.font.regular};
  width: 100%;
  height: 96px;
  color: #000;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;
const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const ModalFooter = styled.div`
  background-color: ${theme.color.main};
  width: 100%;
  height: 96px;
`;
const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  data,
  onClose,
}) => {
  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        content: {
          top: '35%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          borderRadius: '8px',
          width: '50%',
          height: 'auto',
          maxWidth: '830px',
          maxHeight: '90vh',
          padding: 0,
          overflow: 'hidden',
        },
      }}
    >
      <Title>멤버 관리 버튼 </Title>
      <ModalContentWrapper>
        <ModalContent>회원정보</ModalContent>
        <ModalContent>활동정보</ModalContent>
      </ModalContentWrapper>
      <ModalFooter>버튼그룹컴포넌트</ModalFooter>
    </Modal>
  );
};

export default MemberDetailModal;
