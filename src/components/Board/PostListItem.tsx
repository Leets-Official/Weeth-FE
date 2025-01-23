import Comment from '@/assets/images/ic_comment_count.svg';
import FileIcon from '@/assets/images/ic_file.svg';
import FEIcon from '@/assets/images/ic_FE_color.svg';
import BEIcon from '@/assets/images/ic_BE_color.svg';
import DEIcon from '@/assets/images/ic_DE_color.svg';
import ADIcon from '@/assets/images/ic_MA_color.svg';
import * as S from '@/styles/board/PostListItem.styled';

type ItemProps = {
  name: string;
  time: string;
  title: string;
  content: string;
  onClick: () => void;
  totalComments: number;
  hasFile: boolean;
  position: string;
  role: string;
};

// 문자열을 50글자로 제한하고, 넘어가면 "..." 추가
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// 포지션별 아이콘 매핑
const positionIcons: Record<string, string> = {
  FE: FEIcon,
  BE: BEIcon,
  DE: DEIcon,
  AD: ADIcon,
};

const PostListItem = ({
  name,
  time,
  title,
  content,
  onClick,
  totalComments,
  hasFile,
  position,
  role,
}: ItemProps) => {
  // role이 ADMIN이면 ADIcon, 아니면 포지션별 아이콘 사용
  const getPositionIcon = () => {
    return role === 'ADMIN' ? ADIcon : positionIcons[position] || FEIcon;
  };
  return (
    <S.Container onClick={onClick} style={{ cursor: 'pointer' }}>
      <S.PostLeftSection>
        <S.TitleText>{title}</S.TitleText>
        <S.ContentText>{truncateText(content, 50)}</S.ContentText>
        <S.BottomInfoContainer>
          <S.InfoContainer>
            <S.PositionIcon
              src={positionIcons[position] || FEIcon}
              alt="포지션 아이콘"
            />
            <S.NameText>{name}</S.NameText>
            <S.Divider>|</S.Divider>
            <S.DateText>{time}</S.DateText>
            {hasFile && (
              <>
                <S.Divider>|</S.Divider>
                <S.FileIcon src={FileIcon} alt="파일 아이콘" />
              </>
            )}
          </S.InfoContainer>
          <S.CommentContainer>
            <S.ImgContainer src={Comment} alt="댓글 아이콘" />
            <S.CommentsText>{totalComments}</S.CommentsText>
          </S.CommentContainer>
        </S.BottomInfoContainer>
      </S.PostLeftSection>
    </S.Container>
  );
};

export default PostListItem;
