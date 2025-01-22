import styled from 'styled-components';
import PostingIcon from '@/assets/images/ic_posting_button.svg';

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.main};
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-family: ${({ theme }) => theme.font.semiBold};
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.color.mainDark};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.mainLight};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const PostingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonContainer onClick={onClick}>
      글쓰기
      <Icon src={PostingIcon} alt="글쓰기 아이콘" />
    </ButtonContainer>
  );
};

export default PostingButton;
