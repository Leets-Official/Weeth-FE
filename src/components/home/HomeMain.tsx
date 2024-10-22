import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Caption from '@/components/Button/Caption';
import RightButton from '@/components/Header/RightButton';

import { UserContext } from '@/service/UserContext';

import calendar from '@/assets/images/ic_home_calendar.svg';
import attend from '@/assets/images/ic_home_attend.svg';
import board from '@/assets/images/ic_home_board.svg';
import * as S from '@/styles/home/HomeMain.styled';

const HomeMain: React.FC = () => {
  const navi = useNavigate();
  const { userData } = useContext(UserContext);

  const userName = userData?.name || 'Loading';
  const cardinal =
    userData?.cardinals.length >= 2
      ? userData.cardinals[userData.cardinals.length - 1]
      : userData?.cardinals[0] || 'Loading';

  return (
    <S.StyledHomeMain>
      <S.CaptionContainer>
        <Caption color="#ffffff" textcolor="#000000">
          {cardinal}기
        </Caption>
      </S.CaptionContainer>
      <S.UserInfo>
        <S.UserContainer>
          <S.Name>{userName}</S.Name>
          <S.NickName>Elite님</S.NickName>
        </S.UserContainer>
        <S.RightButtonContainer>
          <RightButton
            onClick={() => {
              navi(`/mypage`);
            }}
          />
        </S.RightButtonContainer>
      </S.UserInfo>
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
          출석 패널티
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
            navi(`/member`);
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
