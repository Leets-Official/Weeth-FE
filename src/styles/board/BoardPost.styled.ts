import theme from '@/styles/theme';
import styled from 'styled-components';

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 23.125rem;
  padding-bottom: 1.25rem;

  ul {
    margin: 0;
  }
`;

export const TitleInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0 1.25rem;
  padding: 1.25rem 0;
  color: white;
  font-size: 1rem;
  font-family: ${theme.font.semiBold};

  &::placeholder {
    font-size: 1rem;
    font-family: ${theme.font.semiBold};
  }
`;

export const ContentInput = styled.textarea`
  height: calc(var(--vh, 1vh) * 40);
  background-color: transparent;
  border: none;
  outline: none;
  resize: none;
  margin: 0 1.25rem;
  padding: 1.25rem 0 0 0;
  color: white;
  font-size: 1rem;

  &::placeholder {
    font-size: 1rem;
  }
`;
