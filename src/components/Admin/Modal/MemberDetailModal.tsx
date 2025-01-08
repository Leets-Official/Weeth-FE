import { MemberData } from '@/components/Admin/context/MemberContext';
import theme from '@/styles/theme';
import Modal from 'react-modal';
import { styled } from 'styled-components';
import dropdownIcon from '@/assets/images/ic_admin_column_meatball.svg';
import closeIcon from '@/assets/images/ic_admin_close.svg';
import ButtonGroup from '../ButtonGroup';
import StatusIndicator from '../StatusIndicator';

// pr: react-modal 사용
interface MemberDetailModalProps {
  data: MemberData;
  onClose: () => void;
}

interface FontStyleProps {
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
}

const ModalContent = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 400px;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
  color: #000;
  display: flex;
  flex: 1.5;
  flex-direction: column;
  gap: 20px;
  padding: 15px 15px 50px 15px;
`;
const Title = styled.div`
  font-family: ${theme.font.regular};
  color: #000;
  font-weight: 700;
  font-size: 24px;
  padding-left: 20px;
`;
const TitleContainer = styled.div`
  background-color: #f2f9f8;
  width: 100%;
  height: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FontStyle = styled.div<FontStyleProps>`
  font-size: ${({ fontSize }) => fontSize || '18px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  color: ${({ color }) => color};
`;

const ModalContentWrapper = styled.div`
  font-family: ${theme.font.regular};
  display: flex;
  flex: 0;
  height: calc(100% - 96px - 96px);
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const ModalContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ModalFooter = styled.div`
  background-color: ${theme.color.main};
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: absolute;
  bottom: 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const LabelFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  color: #a6a6a6;
`;

const DataFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  color: #000;
`;

const CloseIcon = styled.img`
  cursor: pointer;
  margin-right: 20px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 40px;
`;

const ActivityContent = styled(ModalContent)`
  flex: 1;
`;
const getHighestCardinal = (cardinal: string): string => {
  const highestCardinal = cardinal.split('.')[0];
  return `${highestCardinal}기`;
};

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
      onClick: onClose,
    },
  ];
  return (
    <Modal
      isOpen
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
      <ModalContainer>
        <TitleContainer>
          <Title>멤버 관리 버튼 </Title>
          <CloseIcon src={closeIcon} alt="close" onClick={onClose} />
        </TitleContainer>
        <ModalContentWrapper>
          <ModalContent>
            <FontStyle fontSize="12px">회원정보</FontStyle>
            <Flex>
              <FontStyle fontSize="24px" fontWeight="700">
                {data.name} &nbsp;
                {getHighestCardinal(data.cardinal)}
              </FontStyle>
              <StatusIndicator status={data.status} />
            </Flex>
            <FlexWrapper>
              <LabelFlex>
                <FontStyle>직급</FontStyle>
                <FontStyle>역할</FontStyle>
                <FontStyle>학과</FontStyle>
                <FontStyle>전화번호</FontStyle>
                <FontStyle>학번</FontStyle>
                <FontStyle>이메일</FontStyle>
              </LabelFlex>

              <DataFlex>
                <FontStyle>{data.position}</FontStyle>
                <FontStyle>{data.role}</FontStyle>
                <FontStyle>{data.major}</FontStyle>
                <FontStyle>{data.phone}</FontStyle>
                <FontStyle>{data.studentId}</FontStyle>
                <FontStyle>{data.email}</FontStyle>
              </DataFlex>
            </FlexWrapper>
          </ModalContent>
          <ActivityContent>
            <FontStyle fontSize="12px">활동정보</FontStyle>
            <FlexWrapper>
              <LabelFlex>
                <FontStyle>활동기수</FontStyle>
                <FontStyle>상태</FontStyle>
                <FontStyle>가입일</FontStyle>
                <FontStyle>출석</FontStyle>
                <FontStyle>결석</FontStyle>
                <FontStyle>패널티</FontStyle>
              </LabelFlex>

              <DataFlex>
                <FontStyle>{data.cardinal}</FontStyle>
                <FontStyle>{data.membershipType}</FontStyle>
                <FontStyle>{data.joinDate}</FontStyle>
                <FontStyle>{data.attendance}</FontStyle>
                <FontStyle>{data.absence}</FontStyle>
                <FontStyle color="#ff5858">{data.penalty}</FontStyle>
              </DataFlex>
            </FlexWrapper>
          </ActivityContent>
        </ModalContentWrapper>
        <ModalFooter>
          <ButtonGroup buttons={buttons} hasEndGap />
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default MemberDetailModal;
