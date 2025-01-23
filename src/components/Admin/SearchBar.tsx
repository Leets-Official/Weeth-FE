import styled from 'styled-components';
import theme from '@/styles/theme';
import icSearch from '@/assets/images/ic_admin_search.svg';

export const SearchBarWrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
  border-radius: 4px;
  margin: 30px 0;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
  gap: 15px;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 12px 12px 12px 40px;
  border: 1px solid #dedede;
  border-radius: 4px;
  &::placeholder {
    color: ${theme.color.gray[20]};
  }
`;

export const SearchBarIcon = styled.img<{ isWrapped?: boolean }>`
  position: absolute;
  left: ${({ isWrapped }) => (isWrapped ? '32px' : '157px')};
  top: 50%;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
`;

interface SearchBarProps {
  isWrapped?: boolean; // Wrapper css 사용 여부
}

const SearchBar: React.FC<SearchBarProps> = ({ isWrapped = true }) => {
  const content = (
    <>
      <SearchBarIcon src={icSearch} alt="search" isWrapped={isWrapped} />
      <StyledInput placeholder="Search for name" />
    </>
  );

  return isWrapped ? <SearchBarWrapper>{content}</SearchBarWrapper> : content;
};

export default SearchBar;
