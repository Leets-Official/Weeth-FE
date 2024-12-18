import styled from 'styled-components';
import theme from '@/styles/theme';
import icSearch from '@/assets/images/ic_adminSearch.svg';

export const SearchBarWrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 12px 12px 40px;
  border: 1px solid ${theme.color.gray[65]};
  border-radius: 4px;
  &::placeholder {
    color: ${theme.color.gray[20]};
  }
`;

export const SearchBarIcon = styled.img`
  position: absolute;
  left: 32px;
  top: 50%;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
`;

const SearchBar: React.FC = () => {
  return (
    <SearchBarWrapper>
      <SearchBarIcon src={icSearch} alt="search" />
      <StyledInput placeholder="Search for name" />
    </SearchBarWrapper>
  );
};

export default SearchBar;
