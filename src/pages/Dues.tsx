import useGetDuesInfo from '@/api/useGetDuesInfo';
import useGetUserInfo from '@/api/useGetUserInfo';
import Loading from '@/components/common/Loading';
import { toastError } from '@/components/common/ToastMessage';
import DueCategory from '@/components/Dues/DueCategory';
import DuesInfo from '@/components/Dues/DuesInfo';
import DuesTitle from '@/components/Dues/DuesTitle';
import Header from '@/components/Header/Header';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/dues/Dues.styled';
import { useEffect, useState } from 'react';

const Dues: React.FC = () => {
  useCustomBack('/home');

  const { userInfo, loading: isLoadingUser } = useGetUserInfo();

  const [selected, setSelectedDues] = useState<string | null>(null);
  const [cardinal, setCardinal] = useState(0);

  const { duesInfo, duesError, loading } = useGetDuesInfo(cardinal);

  useEffect(() => {
    setCardinal(userInfo?.cardinals?.length ? userInfo.cardinals[0] : 0);
  }, [userInfo]);

  useEffect(() => {
    if (duesError) {
      toastError(duesError);
    }
  }, [duesError]);

  const filteredDues =
    selected === null
      ? duesInfo?.receipts
      : duesInfo?.receipts.filter(
          (receipt) => receipt.description !== `${cardinal}기 회비 등록`,
        );

  if (
    duesInfo?.receipts.some(
      (receipt) => receipt.description === `${cardinal}기 회비 등록`,
    )
  ) {
    setSelectedDues('회비');
  }
  if (loading || isLoadingUser) return <Loading />;

  return (
    <S.StyledDues>
      <Header RightButtonType="none" isAccessible>
        회비
      </Header>
      <DuesTitle />
      <S.CategoryWrapper>
        <DueCategory setSelectedDues={setSelectedDues} />
      </S.CategoryWrapper>
      {duesInfo == null ? (
        <S.NullText>등록된 회비가 없습니다.</S.NullText>
      ) : (
        <S.DuesListBox>
          <S.MoneyBoxContainer>
            <S.MoneyBox>{duesInfo.currentAmount.toLocaleString()}원</S.MoneyBox>
          </S.MoneyBoxContainer>
          <S.Line />
          <S.DuesList>
            {(selected === null || selected === '회비') && (
              <DuesInfo
                key="dues"
                dues={duesInfo.totalAmount}
                category="회비"
                date="2024-04-01"
                memo={duesInfo.description}
              />
            )}
            {selected !== '회비' &&
              filteredDues?.map((receipt) => (
                <DuesInfo
                  key={receipt.id}
                  dues={receipt.amount}
                  category="지출"
                  date={receipt.date}
                  memo={receipt.description}
                />
              ))}
          </S.DuesList>
        </S.DuesListBox>
      )}
    </S.StyledDues>
  );
};

export default Dues;
