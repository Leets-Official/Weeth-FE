import { MemberData } from '@/components/Admin/context/MemberContext';
import theme from '@/styles/theme';
import Modal from 'react-modal';
import { styled } from 'styled-components';
import dropdownIcon from '@/assets/images/ic_admin_column_meatball.svg';
import ButtonGroup from '../ButtonGroup';

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
  display: flex;
  align-items: center;
  padding-left: 20px;
`;
const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  data,
  onClose,
}) => {
  const buttons = [
    {
      label: '가입 승인',
      onClick: () => alert('1명의 멤버 가입을 승인하시겠습니까?'),
    },
    {
      label: '관리자로 변경',
      onClick: () => alert('1명의 멤버 가입을 승인하시겠습니까?'),
    },
    {
      label: '비밀번호 초기화',
      onClick: () => alert('1명의 멤버 비밀번호를 초기화하시겠습니까?'),
    },
    {
      label: '유저 추방',
      onClick: () => alert('1명의 멤버를 추방하시겠습니까?'),
    },
    {
      label: '직접 입력',
      onClick: () => alert('직접 입력 기능을 실행합니다.'), // 나중에 수정
      disabled: false,
      icon: dropdownIcon,
    },
    {
      label: '완료',
      onClick: () => alert('완료'),
    },
  ];
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
      <ModalFooter>
        <ButtonGroup buttons={buttons} hasEndGap />
      </ModalFooter>
    </Modal>
  );
};

export default MemberDetailModal;
