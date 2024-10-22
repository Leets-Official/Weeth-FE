import Caption from '@/components/Button/Caption';
import theme from '@/styles/theme';
import React from 'react';
import * as S from '@/styles/receipt/ReceiptInfo.styled';

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
          <Caption color={theme.color.main.negative}>지출</Caption>
          <S.StyledTextBox>
            <S.Text>{memo}</S.Text>
            <S.SmallText>{date}</S.SmallText>
          </S.StyledTextBox>
        </S.StyledCaptionBox>
        <S.StyledMemoBox>
          <S.Text>{money}원</S.Text>
          <S.SmallText>&nbsp;</S.SmallText>
        </S.StyledMemoBox>
      </S.StyledReceiptBox>
    </S.MemberWrapper>
  );
};

export default ReceiptInfo;
