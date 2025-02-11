import { useNavigate } from 'react-router-dom';

import calendar from '@/assets/images/ic_home_calendar.svg';
import attend from '@/assets/images/ic_home_attend.svg';
import board from '@/assets/images/ic_home_board.svg';
import * as S from '@/styles/home/HomeMain.styled';

const HomeMain: React.FC = () => {
  const navi = useNavigate();

  return (
    <S.StyledHomeMain>
      <S.GridContainer>
        <S.CalendarItem
          onClick={() => {
            navi(`/calendar`);
          }}
        >
          동아리
          <br />
          일정 캘린더
          <S.PlaceholderImage>
            <img src={calendar} alt="캘린더 이미지" />
          </S.PlaceholderImage>
        </S.CalendarItem>
        <S.PenaltyItem
          onClick={() => {
            navi(`/attendance`);
          }}
        >
          출석
          <S.PlaceholderImage>
            <img src={attend} alt="출석 이미지" />
          </S.PlaceholderImage>
        </S.PenaltyItem>
        <S.BoardItem
          onClick={() => {
            navi(`/board`);
          }}
        >
          게시판
          <S.PlaceholderImage>
            <img src={board} alt="게시판 이미지" />
          </S.PlaceholderImage>
        </S.BoardItem>
        <S.MemberItem
          onClick={() => {
            navi(`/member?cardinal=0`);
          }}
        >
          멤버
          <S.PlaceholderImage />
        </S.MemberItem>
        <S.FeeItem
          onClick={() => {
            navi(`/dues`);
          }}
        >
          회비
          <S.PlaceholderImage />
        </S.FeeItem>
      </S.GridContainer>
    </S.StyledHomeMain>
  );
};

export default HomeMain;
