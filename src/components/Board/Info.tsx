import * as S from '@/styles/board/PostDetail.styled';
import { useNavigate } from 'react-router-dom';

type InfoProps = {
  title: string;
  isEditButtonVisible: boolean;
};

const Info = ({ title, isEditButtonVisible }: InfoProps) => {
  const navigation = useNavigate();

  return (
    <S.InfoContainer>
      <S.TextContainer>
        <S.InfoTitleText>{title}</S.InfoTitleText>
        <S.InfoText>자세한 내용을 보려면 게시물을 클릭하세요.</S.InfoText>
      </S.TextContainer>
      {isEditButtonVisible && (
        <S.PostingButton
          onClick={() => {
            navigation('/study/post');
          }}
        >
          글쓰기
        </S.PostingButton>
      )}
    </S.InfoContainer>
  );
};

export default Info;
