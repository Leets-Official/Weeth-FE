import * as S from '@/styles/attend/AttendMain.styled';
import theme from '@/styles/theme';
import Button from '@/components/Button/Button';

interface AttendInfoProps {
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  isWithinTimeRange: boolean;
  handleOpenModal: () => void;
}

export const AttendInfo: React.FC<AttendInfoProps> = ({
  title,
  startDateTime,
  endDateTime,
  location,
  isWithinTimeRange,
  handleOpenModal,
}) => {
  return (
    <div>
      <S.SemiBold>
        <S.AttendProject>
          오늘은{' '}
          <span style={{ color: theme.color.main }}>&quot;{title}&quot;</span>
          이&#40;가&#41; 있는 날이에요
        </S.AttendProject>
      </S.SemiBold>
      <S.AttendDate>
        날짜: {startDateTime} {endDateTime}
      </S.AttendDate>
      <S.AttendPlace>장소: {location}</S.AttendPlace>
      <S.AttendButton>
        <Button
          color={theme.color.gray[30]}
          textcolor={theme.color.gray[100]}
          onClick={handleOpenModal}
          disabled={!isWithinTimeRange}
        >
          출석하기
        </Button>
      </S.AttendButton>
    </div>
  );
};

export const NoAttnedInfo = () => {
  return (
    <div>
      <S.SemiBold>
        <S.AttendProject>오늘은 일정이 없어요</S.AttendProject>
      </S.SemiBold>
      <S.AttendPlace>동아리원과 스터디를 하는건 어때요?</S.AttendPlace>
    </div>
  );
};
