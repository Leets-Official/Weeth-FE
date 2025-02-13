const AttendRate = () => {
  return (
    <div>
      <S.NameContainer>
        <S.SemiBold>
          <S.AttendName>{userName}&nbsp;</S.AttendName>
        </S.SemiBold>
        <S.AttendText>님의 출석률은</S.AttendText>
      </S.NameContainer>
      <S.AttendPercent>
        <S.TitleWrapper>
          <S.SemiBold>
            <div>{ATTEND_GAUGE}%</div>
          </S.SemiBold>
        </S.TitleWrapper>
        <S.RightButtonWrapper>
          <RightButton onClick={() => navi('/attendCheck')} />
        </S.RightButtonWrapper>
      </S.AttendPercent>
      <S.Progress $isAttend={ATTEND_GAUGE}>
        <S.Dealt $dealt={dealt} />
      </S.Progress>
    </div>
  );
};
