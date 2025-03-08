import { MemberData } from '@/components/Admin/context/MemberContext';
import * as S from '@/styles/admin/cardinal/CardinalModal.styled';
import ButtonGroup from '@/components/Admin/ButtonGroup';
import StatusIndicator from '@/components/Admin/StatusIndicator';
import CommonModal from '@/components/Admin/Modal/CommonModal';
import useAdminActions from '@/hooks/admin/useAdminActions';
import { useState } from 'react';
import getHighestCardinal from '@/utils/admin/getHighestCardinal';
import CardinalEditModal from '@/components/Admin/Modal/CardinalEditModal';
import theme from '@/styles/theme';
import Button from '@/components/Button/Button';

interface MemberDetailModalProps {
  data: MemberData;
  onClose: () => void;
}

const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  data,
  onClose,
}) => {
  const { handleAction } = useAdminActions();
  const [isCardinalModalOpen, setIsCardinalModalOpen] = useState(false);

  const roleChangeButton =
    data.role === 'ADMIN'
      ? {
          label: '사용자로 변경',
          onClick: () => handleAction('사용자로 변경', [data.id]),
        }
      : {
          label: '관리자로 변경',
          onClick: () => handleAction('관리자로 변경', [data.id]),
        };

  const buttons = [
    {
      label: '가입 승인',
      onClick: () => handleAction('가입 승인', [data.id]),
    },
    roleChangeButton,
    {
      label: '비밀번호 초기화',
      onClick: () => handleAction('비밀번호 초기화', [data.id]),
    },
    {
      label: '유저 추방',
      onClick: () => handleAction('유저 추방', [data.id]),
    },
    {
      label: '기수 변경',
      onClick: () => setIsCardinalModalOpen(true),
      style: {
        backgroundColor: isCardinalModalOpen
          ? theme.color.gray[18]
          : theme.color.gray[100],
        color: isCardinalModalOpen ? theme.color.gray[100] : '#000',
      },
    },
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
    <>
      <CommonModal
        isOpen
        onClose={onClose}
        title="멤버 관리 버튼"
        top="40%"
        height="60%"
        footer={
          <S.FooterContainer>
            <ButtonGroup buttons={buttons} />
            <Button
              onClick={onClose}
              color="#fff"
              textcolor="#000"
              width="55px"
              height="45px"
              borderRadius="4px"
            >
              완료
            </Button>
          </S.FooterContainer>
        }
      >
        <S.ContentWrapper>
          <S.ModalContent>
            <S.FontStyle fontSize="12px" color="#000">
              회원정보
            </S.FontStyle>
            <S.FlexWrapper>
              <S.FontStyle fontSize="24px" fontWeight="700" color="#000">
                {data.name} &nbsp;
                {getHighestCardinal(data.cardinals)}
              </S.FontStyle>
              <StatusIndicator status={data.status} />
            </S.FlexWrapper>
            <S.FlexWrapper>
              <S.LabelFlex>
                {memberInfo.map((info) => (
                  <S.FontStyle key={info.label}>{info.label}</S.FontStyle>
                ))}
              </S.LabelFlex>
              <S.DataFlex>
                {memberInfo.map((info) => (
                  <S.FontStyle
                    key={info.label}
                    color={info.label === '패널티' ? '#ff5858' : undefined}
                  >
                    {info.value}
                  </S.FontStyle>
                ))}
              </S.DataFlex>
            </S.FlexWrapper>
          </S.ModalContent>
          <S.ActivityContent>
            <S.FontStyle fontSize="12px" color="#000">
              활동정보
            </S.FontStyle>
            <S.FlexWrapper>
              <S.LabelFlex>
                {activityInfo.map((info) => (
                  <S.FontStyle key={info.label}>{info.label}</S.FontStyle>
                ))}
              </S.LabelFlex>
              <S.DataFlex>
                {activityInfo.map((info) => (
                  <S.FontStyle
                    key={info.label}
                    color={info.label === '패널티' ? '#ff5858' : undefined}
                  >
                    {info.value}
                  </S.FontStyle>
                ))}
              </S.DataFlex>
            </S.FlexWrapper>
          </S.ActivityContent>
        </S.ContentWrapper>
      </CommonModal>
      {isCardinalModalOpen && (
        <CardinalEditModal
          isOpen={isCardinalModalOpen}
          onClose={() => setIsCardinalModalOpen(false)}
          selectedUserIds={[data.id]}
          top="31%"
          left="39%"
        />
      )}
    </>
  );
};

export default MemberDetailModal;
