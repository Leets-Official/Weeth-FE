import { MemberData } from '@/components/Admin/context/MemberContext';
import { styled } from 'styled-components';
import dropdownIcon from '@/assets/images/ic_admin_column_meatball.svg';
import ButtonGroup from '@/components/Admin/ButtonGroup';
import StatusIndicator from '@/components/Admin/StatusIndicator';
import CommonModal from '@/components/Admin/Modal/CommonModal';
import resetPwdApi from '@/api/patchUserManagement';

interface MemberDetailModalProps {
  data: MemberData;
  onClose: () => void;
}

interface FontStyleProps {
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
}

const FontStyle = styled.div<FontStyleProps>`
  font-size: ${({ fontSize }) => fontSize || '18px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  color: ${({ color }) => color};
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex: 0;
  height: calc(100% - 96px - 96px);
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  flex: 1.5;
  margin-top: 50px;
`;

const ActivityContent = styled(ModalContent)`
  flex: 1;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 40px;
`;

const LabelFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  color: #a6a6a6;
`;

const DataFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  color: #000;
`;

const getHighestCardinal = (cardinals: string): string =>
  `${cardinals.split('.')[0]}기`;

const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  data,
  onClose,
}) => {
  const handleAction = async (action: string) => {
    if (
      !window.confirm(`"${data.name}" 멤버의 ${action}을(를) 진행하시겠습니까?`)
    )
      return;

    try {
      console.log(`${action} API 요청 시작...`);
      if (action === '비밀번호 초기화') await resetPwdApi(data.id);
      console.log(` 비밀번호 초기화 요청 대상 ID: ${data.id}`);

      alert('비밀번호 초기화가 완료되었습니다.');
    } catch (error: any) {
      console.error('오류 발생 : ', error.message);
    }
  };
  const buttons = [
    {
      label: '가입 승인',
      onClick: () => handleAction('가입 승인'),
    },
    {
      label: '관리자로 변경',
      onClick: () => handleAction('관리자로 변경'),
    },
    {
      label: '비밀번호 초기화',
      onClick: () => handleAction('비밀번호 초기화'),
    },
    {
      label: '유저 추방',
      onClick: () => handleAction('유저 추방'),
    },
    {
      label: '직접 입력',
      onClick: () => alert('직접 입력'),
      icon: dropdownIcon,
    },
    { label: '완료', onClick: onClose },
  ];

  const memberInfo = [
    { label: '직급', value: data.role },
    { label: '역할', value: data.position },
    { label: '학과', value: data.department },
    { label: '전화번호', value: data.tel },
    { label: '학번', value: data.studentId },
    { label: '이메일', value: data.email },
  ];

  const activityInfo = [
    { label: '활동기수', value: data.cardinals },
    { label: '상태', value: data.membershipType },
    { label: '가입일', value: data.createdAt },
    { label: '출석', value: data.attendanceCount },
    { label: '결석', value: data.absenceCount },
    { label: '패널티', value: data.penaltyCount },
  ];

  return (
    <CommonModal
      isOpen
      onClose={onClose}
      title="멤버 관리 버튼"
      footer={<ButtonGroup buttons={buttons} hasEndGap />}
    >
      <ModalContentWrapper>
        <ModalContent>
          <FontStyle fontSize="12px" color="#000">
            회원정보
          </FontStyle>
          <FlexWrapper>
            <FontStyle fontSize="24px" fontWeight="700" color="#000">
              {data.name} &nbsp;
              {getHighestCardinal(data.cardinals)}
            </FontStyle>
            <StatusIndicator status={data.status} />
          </FlexWrapper>
          <FlexWrapper>
            <LabelFlex>
              {memberInfo.map((info) => (
                <FontStyle key={info.label}>{info.label}</FontStyle>
              ))}
            </LabelFlex>
            <DataFlex>
              {memberInfo.map((info) => (
                <FontStyle
                  key={info.label}
                  color={info.label === '패널티' ? '#ff5858' : undefined}
                >
                  {info.value}
                </FontStyle>
              ))}
            </DataFlex>
          </FlexWrapper>
        </ModalContent>
        <ActivityContent>
          <FontStyle fontSize="12px" color="#000">
            활동정보
          </FontStyle>
          <FlexWrapper>
            <LabelFlex>
              {activityInfo.map((info) => (
                <FontStyle key={info.label}>{info.label}</FontStyle>
              ))}
            </LabelFlex>
            <DataFlex>
              {activityInfo.map((info) => (
                <FontStyle
                  key={info.label}
                  color={info.label === '패널티' ? '#ff5858' : undefined}
                >
                  {info.value}
                </FontStyle>
              ))}
            </DataFlex>
          </FlexWrapper>
        </ActivityContent>
      </ModalContentWrapper>
    </CommonModal>
  );
};

export default MemberDetailModal;
