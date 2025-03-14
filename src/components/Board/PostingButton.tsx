import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostingIcon from '@/assets/images/ic_posting_button.svg';
import theme from '@/styles/theme';

const ButtonContainer = styled.button<{ shrink: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-right: 15px;
  padding: ${({ shrink }) => (shrink ? '12px' : '12px 16px')};
  border-radius: 40px;
  background-color: ${theme.color.main};
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  color: white;
  transition:
    padding 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const PostingButton = ({ onClick }: { onClick: () => void }) => {
  const [shrink, setShrink] = useState(false);

  const handleScroll = () => {
    const scrolled = window.scrollY > 50;
    setShrink(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ButtonContainer onClick={onClick} shrink={shrink}>
      {!shrink && '글쓰기'}
      <Icon src={PostingIcon} alt="글쓰기 아이콘" />
    </ButtonContainer>
  );
};

export default PostingButton;
