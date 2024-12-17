import styled from 'styled-components';
import theme from '@/styles/theme';

export const SearchBarWrapper = styled.div`
  color: #000000;
  background-color: #ffffff;
  width: 100%;
  padding: 20px;
`;

export const StyledInput = styled.input`
  /* width: fit-content; */
  &::placeholder {
    color: ${theme.color.gray[20]};
  }
  padding: 12px;
  border: 1px solid ${theme.color.gray[65]};
  border-radius: 4px;
`;

const SearchBar: React.FC = () => {
  return (
    <SearchBarWrapper>
      <StyledInput placeholder="Search for name" />
    </SearchBarWrapper>
  );
};

export default SearchBar;
