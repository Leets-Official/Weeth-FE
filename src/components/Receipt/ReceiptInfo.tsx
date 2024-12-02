import Caption from '@/components/Button/Caption';
import * as S from '@/styles/receipt/ReceiptInfo.styled';
import theme from '@/styles/theme';
import React from 'react';

interface ReceiptInfoProps {
  money: string;
  date: string;
  memo: string;
}

const ReceiptInfo: React.FC<ReceiptInfoProps> = ({ money, date, memo }) => {
  return (
    <S.MemberWrapper>
      <S.StyledReceiptBox>
        <S.StyledCaptionBox>
          <Caption color={theme.color.negative}>지출</Caption>
          <S.StyledTextBox>
            <S.Text isLong={memo.length >= 10}>{memo}</S.Text>
            <S.SmallText>{date}</S.SmallText>
          </S.StyledTextBox>
        </S.StyledCaptionBox>
        <S.StyledMemoBox>
          <S.MoneyText>{money}원</S.MoneyText>
          <S.SmallText>&nbsp;</S.SmallText>
        </S.StyledMemoBox>
      </S.StyledReceiptBox>
    </S.MemberWrapper>
  );
};

export default ReceiptInfo;
